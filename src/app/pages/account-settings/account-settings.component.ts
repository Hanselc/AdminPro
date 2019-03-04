import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public _settings: SettingsService) { }

  ngOnInit() {
  }

  changeColor(value: string, elem: any) {
    this.applyCheck(elem);
    this._settings.setTheme(value);
  }

  applyCheck(link: any){
    const selectors = this._document.getElementsByClassName('selector');

    for(let ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
}
