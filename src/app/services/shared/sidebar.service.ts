import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress-page' },
        { title: 'Graphs', url: '/graphs1' },
        { title: 'Promises', url: '/promises' },
        { title: 'RxJs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }
}
