import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.threeSeconds()
      .then((msg) => console.log('termino', msg))
      .catch((error) => console.log('error', error));
  }

  ngOnInit() {
  }

  threeSeconds(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let counter = 0;
      let interval = setInterval(() => {
        counter++;
        console.log(counter);
        if (counter === 3) {
          resolve(true);
          // reject('error');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
