import { Component, OnInit, Input, Output, EventEmitter , ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  @ViewChild('txtnumber') txtnumber: ElementRef;

  @Input() legend: string = 'Legend';
  @Input('initial-percent') percent: number = 50;

  @Output() change: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onChange(newValue: number) {

    // const inputHtml: any = document.getElementsByName('txtnumber')[0];

    if (newValue > 100) {
      this.percent = 100;
    } else if (newValue < 0 || !newValue) {
      this.percent = 0;
    } else {
      this.percent = newValue;
    }

    this.txtnumber.nativeElement.value = this.percent;

    this.change.emit(this.percent);
  }

  changeValue(value: number) {

    if ((value < 0 && this.percent <= 0) || (value > 0 && this.percent >= 100)) {
      return;
    }

    this.percent = Number(this.percent) + value;

    this.change.emit(this.percent);
    this.txtnumber.nativeElement.focus();
  }
}
