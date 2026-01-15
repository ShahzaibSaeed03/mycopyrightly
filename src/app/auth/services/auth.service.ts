// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable, throwError } from 'rxjs';
// import { environment } from '../../../enviroments/enviroment';

// @Injectable({
//   providedIn: 'root'
// })
// // export class AuthService {

//   BaseUrl = `${environment.apiUrl}/user`;

//   constructor(private http: HttpClient) { 

//   }

  // public getCurrentToken() { 
  //   return localStorage.getItem('token'); 
  //  }

  // login(email: string, password: string) {
  //   return this.http.post<{ user: any, token: string }>(`${this.BaseUrl}/login`, { email, password }).pipe(map(data => {
  //     console.log("data", data);
  //     localStorage.setItem('token', JSON.stringify(data.token));
  //   }))
  // }

  // logout() {

  // }



  //   import { Injectable } from '@angular/core';
  // import { environment } from 'src/environments/environment';
  // import { ActivatedRouteSnapshot, Router, NavigationExtras } from '@angular/router';
  // // import { User } from '../../models/user';
  // import { HttpClient } from '@angular/common/http';
  // import { map } from 'rxjs/operators';
  // import { BehaviorSubject } from 'rxjs';

  // @Injectable({
  //   providedIn: 'root'
  // })
  // export class AuthService {

  //   currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //   public _currentUser: any;
  //   private navigationExtras!: NavigationExtras;

  //   constructor(private router: Router, private http: HttpClient) {
  //       // this.currentUser$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(constant.currentUser)!));
  //   }

  //   async getCurrentUser(): Promise<any> {
  //     if (!this._currentUser) {
  //       // this._currentUser = await this.login();
  //     }
  //     // need setPermissions
  //     return this._currentUser;
  //   }

  //   public isLogged() {
  //     return this.getCurrentUser().then(value => {
  //       return value ? true : false;
  //     });
  //   }

  //   public login( email: any , password : string) {
  //     console.log('signIn' , email); 
  //     debugger;
  //     return this.http.post<any>(`${environment.apiSsoUrl}/authenticate`,
  //     {
  //        email: email,
  //       password: password
  //     }
  //     ).pipe(map(user => {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUser$.next(user);
  //       return true;
  //     }))
  //   }


  //   public logout() {
  //     localStorage.removeItem('currentUser');
  //     this.currentUser$.next(null as any);
  //   }




  // }




//   private handleError(error: HttpErrorResponse): Observable<any> {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `Network error: ${error.error.message}`;
//     } else {
//       errorMessage = `Server error (status ${error.status}): ${error.message}`;
//     }
//     return throwError(() => new Error(errorMessage));
//   }
// }
