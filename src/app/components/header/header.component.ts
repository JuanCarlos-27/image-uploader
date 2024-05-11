import { Component, Signal, effect, inject, signal } from '@angular/core';
import { ToggleThemeButtonComponent } from '../toggle-theme-button/toggle-theme-button.component';
import { Theme } from '../../utils/themeOptions';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [ToggleThemeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  public theme: Signal<Theme | null> = this.themeService.$theme;
}
