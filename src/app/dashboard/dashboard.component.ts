import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  usersCount = 0;
  activeSurveysCount = 0;
  unAcceptedSurveysCount = 0;
  finishedSurveysCount = 0;
  categoriesCount = 0;
  pendingCategoriesCount = 0;
  constructor(
    private surveyService: SurveyService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.usersCount = data.length;
      },
    });
    this.surveyService.getUnAcceptedSurvey().subscribe({
      next: (data) => {
        this.unAcceptedSurveysCount = data.length;
      },
    });
    this.surveyService.getSurveys().subscribe({
      next: (data) => {
        this.activeSurveysCount = data.length;
      },
    });
    this.surveyService.getAcceptedSurvey().subscribe({
      next: (data) => {
        this.finishedSurveysCount = data.length;
      },
    });
    this.categoryService.AcceptedCategory().subscribe({
      next: (data) => {
        this.categoriesCount = data.length;
      },
    });
    this.categoryService.UnAcceptedCategory().subscribe({
      next: (data) => {
        this.pendingCategoriesCount = data.length;
      },
    });
  }
}
