import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-survey',
  standalone: false,
  templateUrl: './my-survey.component.html',
  styleUrl: './my-survey.component.css'
})
export class MySurveyComponent {
surveys: any[] = [];
  errorMessage = '';
 user = JSON.parse(localStorage.getItem('user') || '{}'); 
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys() {
    this.surveyService.getSurveyByUserId( this.user.id).subscribe({
      next: async (data) => {
        this.surveys = await data;
        
      },
      error: (err) => {
        this.errorMessage = 'Failed to load surveys. Please try again later.';
      }
    });
  }

  finishSurvey(surveyId: number): void {
    this.surveyService.IsFinished(surveyId).subscribe({
      next: (data)=>{
        this.toastr.error('preparing results...');
        setTimeout(() => {
        window.location.reload();
      }, 2000);
      
      },
      error: (err)=>{
       
      }
    });

  } 
   viewSurveyResult(id: number): void {
    this.router.navigate(['/surveyResult', id]);
  }
}
