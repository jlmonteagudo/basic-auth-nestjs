import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  private readonly BASE_URL = '/api/auth';

  customer$: Observable<string>;

  constructor(private httpClient: HttpClient) {
    this.customer$ = this.httpClient.get<string>(this.BASE_URL).pipe(
      catchError((error) => {
        console.warn('Error occurred: ', error.message);
        return EMPTY;
      })
    );
  }
}
