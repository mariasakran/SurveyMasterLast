import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiUrl = 'http://localhost:8088/users';
  constructor(private http: HttpClient) {}
  getUserDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
   
     if (user && user.username) {
      const username = user.username;

      return this.http.get(`http://localhost:8088/users/${username}`);
    } else {
      throw new Error('No user logged in');
    }
  }
  getAllUsers(){
    return this.http.get(`http://localhost:8088/users`);
  }
  editUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, userData);
  }
  deleteUser(num: number){
    return this.http.delete(`http://localhost:8088/users/${num}`).subscribe({
    });
  }
  
  editUserEmail(userId: number,email: String): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/editEmail`, {email});
}

  editUserPassword(userId: number,Password: String): Observable<any> {
        return this.http.put(`${this.apiUrl}/${userId}/editPassword`, {Password});

  }
}
