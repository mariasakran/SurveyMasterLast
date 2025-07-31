import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
userDetails: any = null;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        this.userDetails = data;
        this.loading = true;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.loading = false;
      }
    });
  }
}
