import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  standalone: false,
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit {
 surveys: any[] = [];
  errorMessage = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys() {
    this.surveyService.getSurveys().subscribe({
      next: async (data) => {
        this.surveys = await data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load surveys. Please try again later.';
      }
    });
  }

  viewSurveyDetails(id: number): void {
    this.router.navigate(['/survey', id]);
  }

  createNewSurvey(): void {
    this.router.navigate(['/surveys/create']);
}
}
