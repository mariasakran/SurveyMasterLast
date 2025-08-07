import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-pass',
  standalone: false,
  templateUrl: './rest-pass.component.html',
  styleUrl: './rest-pass.component.css',
})
export class RestPassComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    const newpass = this.forgotPasswordForm.value.newpassword;
    const username: string = localStorage.getItem('username') || '';

    this.authService.restPassword(username, newpass).subscribe({
      next: (data) => {
        this.toastr.success('Password  rest', 'Success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Something went wrong', 'Error');
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  get newpassword() {
    return this.forgotPasswordForm.get('newpassword');
  }
}
