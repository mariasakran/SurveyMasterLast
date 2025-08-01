import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-mangement',
  standalone: false,
  templateUrl: './user-mangement.component.html',
  styleUrl: './user-mangement.component.css'
})
export class UserMangementComponent {
 deletesucsecc=false;
userDetails: any;
wanttodelete=false;

constructor(private authService: AuthService,private router: Router,private http: HttpClient,private toastr: ToastrService) {}
ngOnInit(): void {
  this.authService.getAllUsers().subscribe({
    next: async (data) => {
      this.userDetails =  await data;
      
    },
    error: (err) => {
      console.error('Error fetching user details:', err);
    }
  });
}

openAddUserModal() {
    this.router.navigate(['/adduser']);  
}


openEditUserModal(user: any) {
    console.log('Open Edit User Modal', user);
    localStorage.setItem('edituser',JSON.stringify(user));
    this.router.navigate(['/edit']);  
}
confirmdelete(){
this.wanttodelete=true;
}
canceldelete(){
  this.wanttodelete=false;
}


deleteUser(userId: number) {
  if(this.authService.deleteUser(userId)){
    this.toastr.warning('DELETED');
    this.wanttodelete=false;
    setTimeout(() => {
        window.location.reload();
      }, 2000);
}

      
 
}

}
