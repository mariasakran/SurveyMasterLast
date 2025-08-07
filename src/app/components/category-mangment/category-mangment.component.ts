import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-mangment',
  standalone: false,
  templateUrl: './category-mangment.component.html',
  styleUrl: './category-mangment.component.css',
})
export class CategoryMangmentComponent implements OnInit {
  constructor(
    private router: Router,
    private categoryservice: CategoryService,
    private toastr: ToastrService
  ) {}
  categories: any;

  selectedCategoryId: number | null = null;
  ngOnInit(): void {
    this.categoryservice.getcategories().subscribe({
      next: async (data) => {
        this.categories = await data;
      },
    });
  }

  openAddCategory() {
    this.router.navigate(['/addcategory']);
  }

  deleteCategory() {
    if (this.selectedCategoryId !== null) {
      this.categoryservice.DeleteCategory(this.selectedCategoryId).subscribe({
        next: () => {
          this.toastr.warning('Category has been deleted');
          this.ngOnInit();
          this.selectedCategoryId = null;
        },
        error: () => {
          this.toastr.error('Failed to delete category');
        },
      });
    }
  }
  confirmdelete(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }
  canceldelete() {
    this.selectedCategoryId = null;
  }
}
