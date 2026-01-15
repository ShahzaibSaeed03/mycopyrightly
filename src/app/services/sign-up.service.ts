import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userSignUp } from '../models/userSignUp.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  BaseUrl = `${environment.apiUrl}/user`;

  getCounrtiesList(): Observable<any> {
    let url = "https://data.gov.il/api/3/action/datastore_search?resource_id=b1fdc757-07e3-4875-a023-99e59ac44f24&fields=שם_מדינה_אנגלי_במאגר";
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getUSAStates(): Observable<any> {
    let url = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-united-states-of-america-state/records?select=ste_name&limit=100&offset=0&timezone=UTC&include_links=false&include_app_metas=false";
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  signUp(userSignUp: userSignUp): Promise<any> {    
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.BaseUrl}/signup`, userSignUp, { observe: 'response' }).subscribe({        
        next: (data) => {          
          if (data.status == 201)
            resolve(data)
          reject(data)
        },
        error: (error) => {
          reject(error)
        }
      });
    });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      errorMessage = `Server error (status ${error.status}): ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
