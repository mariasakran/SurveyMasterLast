import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  constructor(private router: Router) {}

  goToPayment() {
    this.router.navigate(['/payment']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
