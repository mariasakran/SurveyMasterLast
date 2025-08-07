import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-forget-pass',
  standalone: false,
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css',
})
export class ForgetPassComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;
  code: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private emailService: EmailService
  ) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    const username = this.forgotPasswordForm.value.username;

    this.authService.requestPasswordReset(username).subscribe({
      next: (data) => {
        this.toastr.success(
          'Password reset link sent if user exists',
          'Success'
        );

        localStorage.setItem('username', username);
        this.isLoading = false;
        this.code = data;
        this.emailService.sendRestCode(username, this.code).subscribe({
          next: () => {
            console.log('done');
          },
          error: (err) => {
            console.log('error sent');
          },
        });
        setTimeout(() => {
          this.router.navigate(['/confirmCode']);
        }, 2000);
      },
      error: (err) => {
        this.toastr.error('Something went wrong', 'Error');
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  get username() {
    return this.forgotPasswordForm.get('username');
  }
}
