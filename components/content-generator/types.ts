export enum SocialPlatform {
  Instagram = "Instagram",
  Facebook = "Facebook",
  Twitter = "Twitter",
  LinkedIn = "LinkedIn",
  TikTok = "TikTok",
}

export interface PlatformConfig {
  platform: SocialPlatform;
  count: number;
  selected: boolean;
}

export type OutputLength = "Short" | "Medium" | "Long";

export interface GeneratedPost {
  id: string;
  platform: SocialPlatform; // The target social media platform
  message: string;
  hashtags: string[];
  visualSuggestion: string;
  imagePrompt: string;
  imageUrl: string | null;
  isTextLoading: boolean;
  isImageLoading: boolean;
  // Fields for tracking generation origin
  targetPlatform: SocialPlatform; // Redundant but explicit for clarity with platform
  targetCountIndex: number; // The 0-based index for this platform's configured count
  targetPersonaText?: string; // The specific persona text used, if cloned
  targetPersonaDisplayIndex?: number; // The 0-based index of the persona in the user's list, if cloned
}

export interface AIPostContent {
  message: string;
  hashtags: string[];
  visualSuggestion: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: GroundingChunkWeb;
}