import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styles: []
})

export class GraphsComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
