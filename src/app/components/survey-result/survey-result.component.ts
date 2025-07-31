import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';


@Component({
  selector: 'app-survey-result',
  standalone: false,
  templateUrl: './survey-result.component.html',
  styleUrl: './survey-result.component.css'
})
export class SurveyResultComponent implements OnInit{
 survey: any;
currentQuestionIndex: number = 0;
  currentQuestion: any;
  totalResponse:number=0;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
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
        this.survey =await data;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
        for(let i = 0 ;i<this.currentQuestion.questionResult.length;i++){
        this.totalResponse=this.totalResponse+this.currentQuestion.questionResult[i];
        
      }
     
      },
      error: (err) => {
        console.error('Error loading survey:', err);
   }
});
}
nextQuestion(): void {
    if (this.currentQuestionIndex < this.survey.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
      for(let i = 0 ;i<this.currentQuestion.questionResult.length;i++){
        this.totalResponse=this.totalResponse+this.currentQuestion.questionResult[i];

      }

    }
    
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
        for(let i = 0 ;i<this.currentQuestion.questionResult.length;i++){
        this.totalResponse=this.totalResponse+this.currentQuestion.questionResult[i];
        
      }
    }
  }

}
