import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationSuccess = false;
  registrationFaild = false;
  user: any;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService,
    private emailService: EmailService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.warning('please enter vaild info', 'Warning');

      return;
    }
    this.registerService.addUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.user = response;
        this.toastr.success('Register successfully!', 'Success');

        this.emailService
          .sendEmail(this.user.email, this.user.username)
          .subscribe({
            next: () => {
              console.log('sent');
            },
            error: (err) => {
              console.error('Failed to send email:');
            },
          });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error adding user', error);
        this.toastr.error('Something went wrong!', 'Error');
      },
    });
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
}
