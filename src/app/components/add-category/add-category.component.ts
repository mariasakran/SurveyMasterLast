import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
categoryForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router:Router) {
    this.categoryForm = this.fb.group({
      type: ['', Validators.required]
      
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        () => {
          this.successMessage = 'Category added successfully!';
          setTimeout(() => {
            this.router.navigate(['/categorymange']);
          }, 2000);
        },
        (error) => {
          console.error('Error adding category', error);
          this.successMessage = 'Category failed!';
        }
      );
    }
  }
}
