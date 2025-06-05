
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIPostContent, OutputLength } from '../types';
import { GEMINI_TEXT_MODEL, GEMINI_IMAGE_MODEL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set. Please ensure the API_KEY environment variable is configured.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePostTextContent = async (
  persona: string, // Now accepts a single persona string (can be combined personas or one specific)
  objective: string,
  platform: string,
  language: string,
  temperature: number,
  outputLength: OutputLength,
  customInstructions?: string,
  avoidanceInstructions?: string
): Promise<AIPostContent> => {
  if (!API_KEY) throw new Error("API_KEY is not configured.");

  let systemInstruction = `You are an expert social media content creator.
Your task is to generate content for a social media post in ${language}, adapting it specifically for the TARGET PLATFORM.
Respond strictly in JSON format. The JSON object MUST have the following keys:
- "message": A string containing the post message in ${language}.
- "hashtags": An array of exactly 5 strings, each being a relevant hashtag in ${language} or universally applicable.
- "visualSuggestion": A string describing a high-performing visual concept for this post, described in ${language}.

PLATFORM-SPECIFIC GUIDELINES:
- Instagram: Visually driven. Message can be longer (up to 2,200 characters), storytelling. Use a mix of popular and niche hashtags. Visuals: high-quality photos, carousels, reels.
- Facebook: Versatile. Message length flexible (can be long). Visuals: engaging images, videos, links. Hashtags are useful but less critical than Instagram.
- Twitter (X): Concise messages (ideally under 280 characters). Use relevant, trending hashtags. Visuals: impactful images, GIFs, short videos, memes.
- LinkedIn: Professional tone. Longer messages, articles, industry insights (up to 3,000 characters for posts, 120,000 for articles). Visuals: infographics, professional photos, charts, document shares. Hashtags: industry-specific.
- TikTok: Short-form video. For 'visualSuggestion', describe a compelling 15-60 second video concept. Message is minimal (caption up to 300 characters), often includes a call to action. Use trending sounds/challenges and relevant hashtags for discoverability.

Ensure the message, hashtags, and visual suggestion are engaging, in ${language}, and perfectly tailored to the specified platform, respecting typical character limits and content styles.`;

  if (outputLength === "Short") {
    systemInstruction += "\nKeep the post message concise and to the point (e.g., 1-2 sentences for platforms like Twitter, a short paragraph for others).";
  } else if (outputLength === "Long") {
    systemInstruction += "\nFeel free to elaborate and provide a more detailed and comprehensive message, within the platform's typical limits.";
  } else { // Medium or default
    systemInstruction += "\nAim for a message of moderate length, balancing detail with readability.";
  }

  if (customInstructions && customInstructions.trim() !== "") {
    systemInstruction += `\nADDITIONAL INSTRUCTIONS TO FOLLOW: ${customInstructions.trim()}`;
  }
  if (avoidanceInstructions && avoidanceInstructions.trim() !== "") {
    systemInstruction += `\nIMPORTANT: AVOID THE FOLLOWING: ${avoidanceInstructions.trim()}`;
  }


  const prompt = `
Generate content for one social media post in ${language} with the following details:
Target Persona(s): ${persona}
Post Objective: ${objective}
Target Platform: ${platform}
Output Language: ${language}

Remember to strictly follow the PLATFORM-SPECIFIC GUIDELINES and any output length, custom, or avoidance instructions provided. Generate all text in ${language}.
For 'visualSuggestion':
- If TikTok: describe a short video concept (e.g., "A 15-second fast-paced video showcasing the product's top 3 features with upbeat trending music and on-screen text overlays.")
- For other platforms: describe a suitable image or graphic (e.g., for Instagram: "A vibrant flat lay photo of a workspace with a laptop showing the app and coffee mug.", for LinkedIn: "An infographic visualizing the key statistic mentioned in the message.")
Provide specific and creative ideas. The message should be ready to publish.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: "user", parts: [{text: prompt}] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: temperature,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }
    
    try {
      const parsedData = JSON.parse(jsonStr) as AIPostContent;
      if (!parsedData.message || !Array.isArray(parsedData.hashtags) || parsedData.hashtags.length === 0 || !parsedData.visualSuggestion) {
        console.error("Parsed JSON is missing required fields or hashtags array is empty:", parsedData, "Original text:", response.text);
        throw new Error("AI response JSON is missing required fields or has empty hashtags.");
      }
      parsedData.hashtags = parsedData.hashtags.slice(0,5);
      return parsedData;
    } catch (e) {
      console.error("Failed to parse JSON response from AI:", e, "Raw text:", response.text, "Cleaned text:", jsonStr);
      return {
        message: `Error: Could not parse AI response for ${platform} (in ${language}). Raw: ${response.text.substring(0,100)}...`,
        hashtags: ["#error", `#${platform.toLowerCase()}`, "#AI", "#parsing", `#${language.toLowerCase()}`],
        visualSuggestion: `Error in AI response processing for ${platform} (in ${language}). Visual suggestion should be specific to ${platform}.`
      };
    }
  } catch (error) {
    console.error("Error generating text content from Gemini:", error);
    throw new Error(`Failed to generate text content for ${platform} (in ${language}): ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const generatePostImage = async (prompt: string, platform: string): Promise<string> => {
  if (!API_KEY) throw new Error("API_KEY is not configured.");
  
  const imageGenerationPrompt = `Generate an eye-catching, high-quality social media visual for ${platform} based on this concept: "${prompt}". Ensure it's engaging and suitable for ${platform}. Modern and clean aesthetic. ${platform === "TikTok" ? "If possible, depict a key frame or concept for a short video." : ""}`;

  try {
    const response = await ai.models.generateImages({
        model: GEMINI_IMAGE_MODEL,
        prompt: imageGenerationPrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      console.error("No image generated or image data missing for prompt:", imageGenerationPrompt, response);
      const placeholderText = `Image Gen Failed for: ${platform} - ${prompt.substring(0,20)}...`;
      return `https://picsum.photos/seed/${encodeURIComponent(prompt.substring(0,30))}/600/400?grayscale&text=${encodeURIComponent(placeholderText)}`;
    }
  } catch (error) {
    console.error("Error generating image from Gemini for prompt:", imageGenerationPrompt, error);
    const errorPlaceholderText = `Image Error for: ${platform}`;
    return `https://picsum.photos/seed/error-${encodeURIComponent(platform)}/600/400?grayscale&text=${encodeURIComponent(errorPlaceholderText)}`;
  }
};
