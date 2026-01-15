import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  BaseUrl = `${environment.apiUrl}/Faq`;

  constructor(private http: HttpClient) { }

  getFaqContent(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/get-faq`);
  }
}
