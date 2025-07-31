import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8088/users'; 

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  }
