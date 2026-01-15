import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

    BaseUrl = `${environment.apiUrl}/stripe`;
  
  constructor(private http: HttpClient) { }

  getClientSecret(number: number) {
    return this.http.post(`${this.BaseUrl}/create-checkout-session/${number}`, {});
  }

  getPaymentStatus(sessionId: string){
    return this.http.get(`${this.BaseUrl}/session-status?session_id=${sessionId}`)
  }
}
