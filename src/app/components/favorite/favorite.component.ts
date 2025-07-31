import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
   added= false;


  constructor(
    private authservice: AuthService,
    private router: Router,
    private categoryservice: CategoryService
  ) {}

  categories: any;
  loading = false;
  userdetails: any;


  ngOnInit(): void {
    // First get user details to know their current favorite
    this.authservice.getUserDetails().subscribe({
      next: (data) => {
        this.userdetails = data;
        // Then get categories and initialize selection
        this.categoryservice.getcategories().subscribe({
          next: (categories) => {
            this.categories = categories;
            this.loading = true;
 
          }   
        });
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
addfavorite(category:String){
  this.userdetails.category= category;
  this.authservice.editUser(this.userdetails.id,this.userdetails).subscribe({
    next:(response)=>{
     
      this.added = true;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    },
    error: (error) => {
      console.error('Error adding user', error);
      this.added = false;
    }
  })

}
 

}
