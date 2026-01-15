import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private http: HttpClient) { }
  BaseUrl = `${environment.apiUrl}/works`;

  // uploadWork(title: string, ownerName: string, additionalOwner: string, file: File) {
  //   const formData = new FormData();
  //   // formData.append('title', title);
  //   // formData.append('ownerName', ownerName);
  //   // formData.append('additionalOwner', additionalOwner);
  //   formData.append('file', file);
  //   return this.http.post(`${this.BaseUrl}/uploadWork`, formData);
  // }

  uploadWork(title: string, ownerName: string, additionalOwner: string, file: File): Observable<string> {
    const formData = new FormData();
    // formData.append('title', title);
    // formData.append('ownerName', ownerName);
    // formData.append('additionalOwner', additionalOwner);
    formData.append('file', file);
    return this.http.post<string>(`${this.BaseUrl}/uploadWork`,
      formData
    );
  }

  findWorks(id?: number, title?: string, from?: string, to?: string): Observable<any> {
    let params = new HttpParams();

    if (id) params = params.set('id', id.toString());
    if (title) params = params.set('title', title);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    console.log(params);

    return of(null)
    // return this.http.get<any>(this.baseUrl, { params });
  }
}
