import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-survey-details',
  standalone: false,
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.css'
})
export class SurveyDetailsComponent implements OnInit {
 user = JSON.parse(localStorage.getItem('user') || '{}');  
 survey: any;
 currentQuestionIndex: number = 0;
  currentQuestion: any;
   id:any;
  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadSurvey(+this.id);
    }
  }

  loadSurvey(id: number): void {
    this.surveyService.getSurvey(id).subscribe({
      next: async (data) => {
        this.survey =await data;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];

     
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
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
    }
  }
submitSurvey(): void {
  // Define response interface for better type safety
  interface QuestionResponse {
    questionId: number;
    questionType : string;
    selectedIndexes?: number[];  // For checkbox questions
    selectedIndex?: number;      // For radio questions
    textResponse?: string;       // For text questions
  }

  const responses: QuestionResponse[] = this.survey.questions.map((question: any) => {
    const response: QuestionResponse = {
      questionId: question.id ,
      questionType : question.questionType
    
    };

    switch (question.questionType) {
      case 'checkbox':
        // Save indexes of selected options
        response.selectedIndexes = question.answerOptions
          .map((opt: any, index: number) => opt.selected ? index : -1)
          .filter((index: number) => index !== -1);
        break;

      case 'radio':
        // Save index of selected option
        const radioIndex = question.answerOptions.findIndex(
          (opt: any) => opt.id === question.selectedOption
        );
        if (radioIndex !== -1) {
          response.selectedIndex = radioIndex;
        }
        break;

      case 'text':
        // Save text response
        if (question.textAnswer) {
          response.textResponse = question.textAnswer;
        }
        break;

        
    }
    if(response.questionType==="radio"){
    this.surveyService.addRadioResult(response.questionId,response.selectedIndex,this.id,this.user.id).subscribe({
      next: async (data) => {

         console.log("done radio ");

     
      },
      error: (err) => {
            console.error('Errora adding result:radio');
            return;

      }
    });

    }
    else if(response.questionType==="text"){
      this.surveyService.addStringResult(response.questionId,response.textResponse,this.id,this.user.id).subscribe({
     next: async (data) => {

     console.log("done string ");
     
      },
      error: (err) => {
        console.error('Errora adding result:text');
        return;
      }
      });
    }
    else{
      this.surveyService.addaddChickBoxResult(response.questionId,response.selectedIndexes,this.id,this.user.id).subscribe({
             next: async (data) => {

     console.log("done checkbox");
     
      },
      error: (err) => {
        console.error('Errora adding result:check');
        return;
      }
      });
    }
    console.log(response);

    
    return response;
  });
  
      this.surveyService.addVoter(this.id,this.user.id).subscribe({
      next:(data)=>{
        console.log("done voter");
          this.toastr.success('thanks for answer', 'Success');

      }    , error: (err) => {
            this.toastr.error('you already filled this survey', 'Error');
        return;
   }

   
    });


}
}
