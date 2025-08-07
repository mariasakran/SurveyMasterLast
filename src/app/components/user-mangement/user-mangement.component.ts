import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-mangement',
  standalone: false,
  templateUrl: './user-mangement.component.html',
  styleUrl: './user-mangement.component.css',
})
export class UserMangementComponent {
  deletesucsecc = false;
  userDetails: any;
  wanttodelete = false;
  userToDeleteId: number | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: async (data) => {
        this.userDetails = await data;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }

  openAddUserModal() {
    this.router.navigate(['/adduser']);
  }

  openEditUserModal(user: any) {
    localStorage.setItem('edituser', JSON.stringify(user));
    this.router.navigate(['/edit']);
  }
  confirmdelete(userId: number) {
    this.userToDeleteId = userId;
  }
  canceldelete() {
    this.userToDeleteId = null;
  }

  deleteUser() {
    if (this.userToDeleteId != null) {
      this.authService.deleteUser(this.userToDeleteId).subscribe({
        next: () => {
          this.toastr.warning('DELETED');
          this.userToDeleteId = null;

          this.ngOnInit();
        },
        error: () => {
          this.toastr.error('Failed to delete user');
        },
      });
    }
  }
}
