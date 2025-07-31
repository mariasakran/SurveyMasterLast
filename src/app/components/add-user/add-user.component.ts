import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUSERComponent {
registerForm: FormGroup;
  addSuccess = false;
  addFaild = false;
  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Please enter valid details!');
      return;
    }
    this.registerService.addUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.addSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/usermange']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error adding user', error);
        this.addFaild = true;
      }
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
  get role() {
    return this.registerForm.get('role');
  }
  
}
