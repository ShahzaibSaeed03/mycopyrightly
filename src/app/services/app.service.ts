import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getFooterStrings():Observable<any>{
    const obj = {
      line1: 'first free line of text here',
      line2: 'second free line of text here'
    }
    return of(obj)
  }

    private handleError(error: HttpErrorResponse): import("rxjs").Observable<any> {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        errorMessage = `Server error (status ${error.status}): ${error.message}`;
      }
      return throwError(() => new Error(errorMessage));
    }
}
