import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'theme-mode';
  private document = inject(DOCUMENT);

  initTheme(): void {
    const savedTheme = this.getStoredTheme();
    this.applyTheme(savedTheme);
  }

  toggleTheme(): void {
    const nuevoTema: ThemeMode = this.getStoredTheme() === 'dark' ? 'light' : 'dark';

    this.applyTheme(nuevoTema);
    localStorage.setItem(this.STORAGE_KEY, nuevoTema);
  }

  private applyTheme(theme: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private getStoredTheme(): ThemeMode {
    return (localStorage.getItem(this.STORAGE_KEY) as ThemeMode) ?? 'light';
  }
}
