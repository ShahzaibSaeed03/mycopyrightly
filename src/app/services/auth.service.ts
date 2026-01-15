import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  BaseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ user: any, token: string }>(`${this.BaseUrl}/login`, { email, password }).pipe(map(data => {
      localStorage.setItem('token', JSON.stringify(data.token));
      return data.user;
    }))
  }


  // isLoggedIn() {
  //   return (JSON.parse('token')) ? true : false;
  // }

  getCurrentToken() {
    return localStorage.getItem('token ');
  }

  public logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  // clearUser() {
  //   this.userSubject.next(null);
  // }

  isLoggedIn() {
    console.log(this.userSubject.value);
    console.log(localStorage.getItem('token'));
    return this.userSubject.value !== null;
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
