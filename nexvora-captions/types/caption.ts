export type Language = 'bn' | 'en';

export type Length = 'short' | 'medium' | 'long';

export type Platform =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'reels'
  | 'story'
  | 'bio'
  | 'whatsapp';

export type CaptionStatus = 'draft' | 'published';

export interface Caption {
  id: string;
  text: string;
  language: Language;
  category: string;
  mood: string;
  length: Length;
  tags: string[];
  platforms: Platform[];
  status: CaptionStatus;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  relatedSlugs?: string[];
}

export interface CaptionFilters {
  query?: string;
  category?: string;
  language?: Language;
  mood?: string;
  length?: Length;
  platform?: Platform;
}
