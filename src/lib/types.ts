export enum LayoutPreset {
  STACK_VERTICAL = "STACK_VERTICAL",
  BENTO_GRID = "BENTO_GRID",
  CAROUSEL = "CAROUSEL",
  MINIMAL = "MINIMAL"
}

export enum ThemeType {
  INDIGO_ETHEREAL = "INDIGO_ETHEREAL",
  DARK_MINIMAL = "DARK_MINIMAL",
  LIGHT_GLASS = "LIGHT_GLASS",
  MIDNIGHT_LIME = "MIDNIGHT_LIME"
}

export enum Plan {
  FREE = "FREE",
  PRO = "PRO"
}

export enum ButtonStyle {
  ROUNDED = "ROUNDED",
  SOFT = "SOFT",
  SHARP = "SHARP",
  GHOST = "GHOST"
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  active: boolean;
  order: number;
  description?: string;
  thumbnailUrl?: string;
}

export interface Profile {
  uid: string;
  slug: string;
  displayName: string;
  bio?: string;
  image?: string;
  layoutPreset: LayoutPreset;
  theme: ThemeType;
  buttonStyle?: ButtonStyle;
  themeColor?: string;
  bgColor?: string;
  fontFamily?: string;
  plan?: Plan;
  stripeId?: string;
  subscription?: string;
}

// Alias to keep compatibility with some older parts
export type PublicPage = Profile;
