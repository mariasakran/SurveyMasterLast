import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-code-confirm',
  standalone: false,
  templateUrl: './code-confirm.component.html',
  styleUrl: './code-confirm.component.css',
})
export class CodeConfirmComponent {
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
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    const code = this.forgotPasswordForm.value.code;
    const username: string = localStorage.getItem('username') || '';

    this.authService.CheckForgetPasswordCode(username, code).subscribe({
      next: (data) => {
        this.toastr.success('Password ready to rest', 'Success');
        setTimeout(() => {
          this.router.navigate(['/restPass']);
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

  get code() {
    return this.forgotPasswordForm.get('code');
  }
}
