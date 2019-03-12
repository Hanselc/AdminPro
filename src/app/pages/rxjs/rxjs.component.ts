import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
      this.subscription = this.getObservable().pipe(
        retry(2)
      ).subscribe(
        n => { console.log('Subs ', n); },
        error => { console.error('Error ', error); },
        () => { console.log('Observable complete! '); }
      );
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('Page is closing');
    this.subscription.unsubscribe();
  }

  getObservable(): Observable<any> {
    return new Observable<any> ( observer => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;

        const out = {
          value: counter
        };

        observer.next(out);

        // if (counter === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (counter === 2) {
        //   clearInterval(interval);
        //   observer.error('help!!');
        // }

      }, 1000);
    }).pipe(
      map( resp =>  resp.value ),
      filter((value, index) => {
        if ((value % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
