import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
thanks=false;
  paymentForm!: FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,private AuthService: AuthService, private router: Router) {
  }
Userdetails:any;
ngOnInit(): void {
  this.paymentForm = this.formBuilder.group({
    cardholderName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
    expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
  });
  this.AuthService.getUserDetails().subscribe({
    next: (data) => {
      this.Userdetails = data;
      this.Userdetails.role= 'Subscriber';
    },
    error: (err) => {
      console.error('Error fetching user details:', err);
    }
  
  });
  
}


get f() { return this.paymentForm.controls; }

onSubmit() {
  this.submitted = true;
  if (this.paymentForm.invalid) {
    return;
  }
  this.AuthService.editUser(this.Userdetails.id,this.Userdetails).
  subscribe({
    next: (response) => {
     this.thanks=true;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    },
    error: (error) => {
      console.error('Error adding user', error);
         

    }
  
  });
}
}
