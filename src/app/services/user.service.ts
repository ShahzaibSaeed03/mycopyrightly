// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private userSubject = new BehaviorSubject<any>(null);
//   public user$: Observable<any> = this.userSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   setUser(user: any) {
//     this.userSubject.next(user);
//   }

//   getUser() {
//     return this.userSubject.value;
//   }

//   clearUser() {
//     this.userSubject.next(null);
//   }

//   isLoggedIn() {
//     return this.userSubject.value !== null;
//   }
// }
