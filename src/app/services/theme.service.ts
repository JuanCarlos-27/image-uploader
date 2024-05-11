import { Injectable, computed, signal } from '@angular/core';
import { THEMES, Theme } from '../utils/themeOptions';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  private theme = signal<Theme | null>(THEMES.LIGHT);
  public $theme = computed(() => this.theme());

  public readonly themeOptions = THEMES;

  toggleTheme() {
    const scheme = document.documentElement.getAttribute('scheme');
    const isLightMode = scheme === THEMES.LIGHT;

    const theme = isLightMode ? THEMES.DARK : THEMES.LIGHT;

    document.documentElement.setAttribute('scheme', theme);

    localStorage.setItem('scheme', theme);

    document.body.classList.toggle(THEMES.LIGHT);

    this.theme.set(theme);
  }

  initScheme() {
    let scheme = null;

    const hasSelectedTheme = localStorage.getItem('scheme');

    if (hasSelectedTheme) {
      scheme = hasSelectedTheme as Theme;
      document.documentElement.setAttribute('scheme', scheme);
      this.theme.set(scheme);
      return;
    }

    const isBrowserSchemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    scheme = isBrowserSchemeDark ? THEMES.DARK : THEMES.LIGHT;
    this.theme.set(scheme);

    if (localStorage.getItem('scheme')) {
      scheme = localStorage.getItem('scheme') as Theme;
    }
    document.documentElement.setAttribute('scheme', scheme);
  }
}
