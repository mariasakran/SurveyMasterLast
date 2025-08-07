import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  LoginFaild = false;
  loginDone = false;
  userDetails: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password,
    };
    this.http
      .post('http://localhost:8088/auth/login', credentials, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          const user = response.body.user;
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.getUserDetails().subscribe({
            next: (data) => {
              this.userDetails = data;
              this.LoginFaild = false;
              this.loginDone = true;
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 2000);
            },
            error: (err) => {
              this.LoginFaild = true;
            },
          });
        },
        error: (error) => {
          if (error.status === 401) {
            this.LoginFaild = true;
          } else {
            this.LoginFaild = true;
          }
        },
      });
  }
}
