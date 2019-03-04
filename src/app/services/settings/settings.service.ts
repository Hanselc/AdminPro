import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) { }

  saveSettings(){
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings(){
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }

    this.applyTheme(this.settings.theme);
  }

  private applyTheme(theme: string){
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('main-theme').setAttribute('href', url);
  }

  setTheme(theme: string){
    this.settings.theme = theme;
    this.settings.themeUrl = `assets/css/colors/${theme}.css`;
    this.saveSettings();
    this.applyTheme(theme);
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
