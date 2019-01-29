import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './progress-page.component.html',
  styles: []
})
export class ProgressPageComponent implements OnInit {

  percentb1: number = 50;
  percentb2: number = 60;

  constructor() { }

  ngOnInit() {
  }

  updateValue(value: number) {
    this.percentb2 = value;
  }
}
