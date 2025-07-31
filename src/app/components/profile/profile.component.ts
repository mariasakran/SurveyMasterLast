import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
userDetails: any = null;
editEmailForm: FormGroup;
editPasswordForm: FormGroup;
openEmailForm = false;
openPasswordForm = false;



  constructor(private toastr: ToastrService, private fb: FormBuilder,private authService: AuthService) {
    this.editEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
      
    });
        this.editPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: async (data) => {
        this.userDetails = await data;
   
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
     
      }
    });
  }
  editEmail( userId: number): void{
    if (this.editEmailForm.invalid) {

      this.toastr.error('Please enter valid Email!');
      return;
    }
    const email = this.editEmailForm.get('email')?.value;

    this.authService.editUserEmail(userId,email).subscribe({
    next: async (data) => {
   this.toastr.success('email updated, Reloding page...', 'Success');   
  setTimeout(() => {
        window.location.reload();
      }, 2200);
     },

      error: async (err) => {
       console.error('Error fetching user email:', err);
        this.toastr.error('Something went wrong!', 'Error');
        
      }

    })
  }

editPassword( userId: number): void{
    if (this.editPasswordForm.invalid) {
      this.toastr.error('Please enter valid Password!');
      return;
    }
const password = this.editPasswordForm.get('password')?.value;
    this.authService.editUserPassword(userId,password).subscribe({
      next: (data) => {
        this.toastr.success('password updated', 'Success');   
        setTimeout(() => {
        window.location.reload();
      }, 2200);
    },
      error: (err) => {
       console.error('Error fetching user password:', err);
       this.toastr.error('Something went wrong!', 'Error');

      }

    })
  }
     OpenEmailForm(): void{
      this.openEmailForm = true;
     }

    closeEmailForm(): void{
      this.openEmailForm = false;
     }
      OpenPasswordForm(): void{
      this.openPasswordForm = true;
     }

    closePasswordForm(): void{
      this.openPasswordForm = false;
     }


  get email() {
    return this.editEmailForm.get('email');

  }
   get password() {
    return this.editPasswordForm.get('password');
  }


}
