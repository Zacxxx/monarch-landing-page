import { SocialPlatform } from './types';

export const AVAILABLE_PLATFORMS: SocialPlatform[] = [
  SocialPlatform.Instagram,
  SocialPlatform.Facebook,
  SocialPlatform.Twitter,
  SocialPlatform.LinkedIn,
  SocialPlatform.TikTok,
];

export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";
export const GEMINI_IMAGE_MODEL = "imagen-3.0-generate-002";

export const DEFAULT_PERSONA_VALUE = "Tech-savvy young professionals interested in innovative solutions and lifestyle improvements.";
export const DEFAULT_OBJECTIVE_VALUE = "Increase brand awareness and engagement for a new productivity app.";

export const MAX_PERSONAS = 5;
export const DEFAULT_TEMPERATURE = 0.7;