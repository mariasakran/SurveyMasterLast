import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accept-category',
  standalone: false,
  templateUrl: './accept-category.component.html',
  styleUrl: './accept-category.component.css',
})
export class AcceptCategoryComponent implements OnInit {
  constructor(
    private categoryservice: CategoryService,
    private toastr: ToastrService
  ) {}
  categories: any;

  ngOnInit(): void {
    this.categoryservice.UnAcceptedCategory().subscribe({
      next: async (data) => {
        this.categories = await data;
      },
    });
  }
  acceptCategory(categoryId: number) {
    this.categoryservice.isAccepted(categoryId).subscribe({
      next: async () => {
        this.toastr.info('Category have been Accepted');
        this.ngOnInit();
      },
      error: () => {
        this.toastr.error('something went wrong');
      },
    });
  }
  declineCategory(categoryId: number) {
    this.categoryservice.DeleteCategory(categoryId).subscribe({
      next: () => {
        this.toastr.warning('Category have been Deleted');
        this.ngOnInit();
      },
      error: () => {
        this.toastr.error('Failed to delete user');
      },
    });
  }
}
