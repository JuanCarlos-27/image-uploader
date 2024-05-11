export const THEMES = {
  LIGHT: 'light-mode',
  DARK: 'dark-mode',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];
