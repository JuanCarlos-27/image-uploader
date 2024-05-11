import { Component, Signal, inject } from '@angular/core';
import { Theme } from '../../utils/themeOptions';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'toggle-theme-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-theme-button.component.html',
  styleUrl: './toggle-theme-button.component.css',
})
export class ToggleThemeButtonComponent {
  constructor() {
    this.themeService.initScheme();
  }

  private themeService = inject(ThemeService);

  public theme: Signal<Theme | null> = this.themeService.$theme;
  public themeOptions = this.themeService.themeOptions;

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
}
