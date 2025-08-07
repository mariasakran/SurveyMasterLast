import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        () => {
          this.toastr.info('Category Added ,Waiting for Accepting');
          setTimeout(() => {
            this.router.navigate(['/categorymange']);
          }, 2000);
        },
        (error) => {
          this.toastr.info('Category already exist or waiting for Accept');
        }
      );
    }
  }
}
