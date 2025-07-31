import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username: string = '';
  password: string = '';
  registrationFaild = false;
  userDetails: any;
  constructor(private http: HttpClient,private router: Router,private authService: AuthService) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.http.post('http://localhost:8088/auth/login', credentials, { observe: 'response', withCredentials: true })
    .subscribe({
      next: (response: any) => { 
        const token = response.body.token;
        const user = response.body.user;
          localStorage.setItem('user',JSON.stringify(user))
           if (token) {
            this.authService.getUserDetails().subscribe({
              next: (data) => {
                this.userDetails = data;  
                this.router.navigate(['/home']);
              },
              error: (err) => {
                console.error('Error fetching user details:', err);
              }
              
            });

           } 
           else {
            this.registrationFaild=true;
           }
      },
      error: (error) => { 
        console.error('Full error response:', error);
        console.error('Status:', error.status);
        if (error.status === 401) {
          this.registrationFaild=true;
        } else {
          this.registrationFaild=true;
        }
      }
    });
  }
}
