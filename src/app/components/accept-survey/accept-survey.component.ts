import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept-survey',
  standalone: false,
  templateUrl: './accept-survey.component.html',
  styleUrl: './accept-survey.component.css'
})
export class AcceptSurveyComponent implements OnInit {
surveys: any[] = [];
 
  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys() {
    this.surveyService.getUnAcceptedSurvey().subscribe({
      next: async (data) => {
        this.surveys = await data;
      },
      error: (err) => {
        console.error('Error loading surveys:', err);
      }
    });
  }  
  
showDetails(surveyId:number) {
this.router.navigate(['/surveydetails', surveyId]); 
}
}
