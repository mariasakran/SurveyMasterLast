import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/users';
  constructor(private http: HttpClient) {}
  getUserDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.username) {
      const username = user.username;

      return this.http.get(`${this.apiUrl}/${username}`);
    } else {
      throw new Error('No user logged in');
    }
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  editUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, userData);
  }
  deleteUser(num: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${num}`);
  }

  editUserEmail(userId: number, email: String): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/editEmail`, { email });
  }

  editUserPassword(userId: number, Password: String): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/editPassword`, { Password });
  }
  sendNotification(notification: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendNotification`, notification);
  }

  getNotification(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getNotification/${userId}`);
  }

  deleteNotifications(userId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/deleteNotificationByUserId/${userId}`
    );
  }
  deleteNotification(notificationId: number) {
    return this.http
      .delete(`${this.apiUrl}/deleteNotificationById/${notificationId}`)
      .subscribe({});
  }
  requestPasswordReset(username: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/requestUpdate/${username}`, {
      responseType: 'text',
    });
  }
  CheckForgetPasswordCode(username: string, Code: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/requestUpdate/${username}/${Code}`,
      {}
    );
  }
  restPassword(username: string, password: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/restPassword/${username}/${password}`,
      {}
    );
  }
}
