"use client";

import { ButtonStyle } from "@/lib/types";

interface ThemeProps {
  themeColor: string;
  bgColor: string;
  fontFamily: string;
  buttonStyle: ButtonStyle;
}

export function ThemeEngine({ theme }: { theme: ThemeProps }) {
  // Inject CSS variables to root with better default scaling
  const css = `
    :root {
      --theme-color: ${theme.themeColor};
      --bg-color: ${theme.bgColor};
      --font-family: '${theme.fontFamily}', sans-serif;
      --btn-radius: ${getRadius(theme.buttonStyle)};
      --btn-bg: ${theme.buttonStyle === ButtonStyle.GHOST ? 'transparent' : 'var(--theme-color)'};
      --btn-text: ${theme.buttonStyle === ButtonStyle.GHOST ? 'var(--theme-color)' : '#ffffff'};
      --btn-border: ${theme.buttonStyle === ButtonStyle.GHOST ? '2px solid var(--theme-color)' : 'none'};
    }
    body {
      background-color: var(--bg-color);
      color: var(--on-surface);
      font-family: var(--font-family);
    }
    .custom-link-card {
      border-radius: var(--btn-radius);
      background-color: var(--btn-bg);
      color: var(--btn-text);
      border: var(--btn-border);
      transition: all 0.2s ease;
    }
    .custom-link-card:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

function getRadius(style: ButtonStyle) {
  switch (style) {
    case ButtonStyle.ROUNDED: return '9999px';
    case ButtonStyle.SOFT: return '1.5rem';
    case ButtonStyle.SHARP: return '0';
    case ButtonStyle.GHOST: return '1.5rem';
    default: return '1rem';
  }
}
