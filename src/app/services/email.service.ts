import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:8088/api/email';
  constructor(private http: HttpClient) {}
  sendEmail(to: string, username: string): Observable<any> {
    const body = {
      to: to,
      username: username,
    };

    return this.http.post(`${this.apiUrl}/send`, body);
  }
  sendNewSurvey(surveyId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/notify-new-survey/${surveyId}`, {});
  }
}
