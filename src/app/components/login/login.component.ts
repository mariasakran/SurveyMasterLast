import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


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
  constructor(private http: HttpClient,private router: Router,private authService: AuthService,private toastr: ToastrService) {}

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
                    this.toastr.success('login successfully!', 'Success');
                  setTimeout(() => {
                   this.router.navigate(['/home']);
                   }, 3000);
              },
              error: (err) => {
                    this.toastr.error('Something went wrong!', 'Error');
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
          this.toastr.error('Something went wrong!', 'Error');
        } else {
          this.toastr.error('Something went wrong!', 'Error');
        }
      }
    });
  }
}
