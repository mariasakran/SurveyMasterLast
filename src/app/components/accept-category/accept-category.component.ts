import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-accept-category',
  standalone: false,
  templateUrl: './accept-category.component.html',
  styleUrl: './accept-category.component.css'
})
export class AcceptCategoryComponent implements OnInit{
constructor(private categoryservice:CategoryService) {}
  categories:any;
  
  ngOnInit(): void {
    this.categoryservice.UnAcceptedCategory().subscribe({
        next:async (data)=>{
          this.categories=await data;
        }
      })  
    }
    acceptCategory(categoryId:number){
      alert ("no more")
      this.categoryservice.isAccepted(categoryId).subscribe({
        next:async (data) =>{

        }
      })

    }
    declineCategory(categoryId: number){
      if(this.categoryservice.DeleteCategory(categoryId)){

      }
    }
}
