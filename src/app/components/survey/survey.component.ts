import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-survey',
  standalone: false,
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
})
export class SurveyComponent implements OnInit {
  surveys: any[] = [];
  categories: any;
  selectedCategory: string = '';
  errorMessage = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadAllSurveys();
    this.loadCategories();
  }

  loadAllSurveys(): void {
    this.surveyService.getSurveys().subscribe({
      next: async (data) => {
        this.surveys = await data;
      },
      error: () => {
        this.errorMessage = 'Failed to load surveys. Please try again later.';
      },
    });
  }

  loadCategories(): void {
    this.categoryService.AcceptedCategory().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  onCategoryChange(category: string): void {
    if (!category) {
      this.loadAllSurveys();
    } else {
      this.surveyService.getSurveysByCategory(category).subscribe({
        next: (data) => {
          this.surveys = data;
        },
        error: () => {
          this.errorMessage = 'Failed to load filtered surveys.';
        },
      });
    }
  }

  viewSurveyDetails(id: number): void {
    this.router.navigate(['/survey', id]);
  }

  createNewSurvey(): void {
    this.router.navigate(['/surveys/create']);
  }
}
