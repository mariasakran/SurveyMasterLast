import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
 editUserDetails:any;
  ngOnInit(): void {
    this.editUserDetails = JSON.parse(localStorage.getItem('edituser') || '{}');
    this.editForm.patchValue({
      username: this.editUserDetails.username,
      email: this.editUserDetails.email,
      password: this.editUserDetails.password,
      role: this.editUserDetails.role
    }); 
  }
  editForm: FormGroup;
  editSuccess = false;
  editFaild = false;
  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.editForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.editForm.invalid) {
      alert('Please enter valid details!');
      return;
    }
    this.AuthService.editUser(this.editUserDetails.id,this.editForm.value).subscribe({
      next: (response) => {
        this.editSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/usermange']);
        }, 3000);
      },
      error: (error) => {
        console.error('Error adding user', error);
        this.editFaild = true;
      }
    });
  }
  get email() {
    return this.editForm.get('email');
  }
  get username() {
    return this.editForm.get('username');
  }
  get password() {
    return this.editForm.get('password');
  }
  get role() {
    return this.editForm.get('role');
  }


}
