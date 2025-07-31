import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-mangment',
  standalone: false,
  templateUrl: './category-mangment.component.html',
  styleUrl: './category-mangment.component.css'
})
export class CategoryMangmentComponent implements OnInit {
  constructor(private router: Router,private categoryservice:CategoryService) {}
  categories:any;

  deletesucsecc=false;
  failddelete=false;
  try=false;
  wanttodelete=false;

  ngOnInit(): void {
    this.categoryservice.getcategories().subscribe({
        next:async (data)=>{
          this.categories= await data;
          
        }
      })  

  }


openAddCategory() {
    this.router.navigate(['/addcategory'])
} 



deleteCategory(CategoryId: number) {
    if(this.categoryservice.DeleteCategory(CategoryId)){
        this.deletesucsecc=true;
        this.wanttodelete=false;
        setTimeout(() => {
            window.location.reload();
          }, 2000);
    }
    
   
    
}
confirmdelete(){
  this.wanttodelete=true;
  }
  canceldelete(){
    this.wanttodelete=false;
  }
}
