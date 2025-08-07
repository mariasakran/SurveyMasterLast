import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-result',
  standalone: false,
  templateUrl: './survey-result.component.html',
  styleUrl: './survey-result.component.css',
})
export class SurveyResultComponent implements OnInit {
  survey: any;
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  totalResponse: number = 0;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSurvey(+id);
    }
  }

  loadSurvey(id: number): void {
    this.surveyService.getSurvey(id).subscribe({
      next: async (data) => {
        this.survey = await data;
        this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
        this.totalResponse = this.survey.voters.length;
      },
      error: (err) => {
        console.error('Error loading survey:', err);
      },
    });
  }
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.survey.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
    }
  }
  deleteSurvey(surveyId: number): void {
    this.surveyService.deleteSurvey(surveyId).subscribe({
      next: () => {
        this.toastr.info('your survey have been deleted');

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500);
      },
      error: (err) => {
        this.toastr.error('something went wrong');
      },
    });
  }
}
