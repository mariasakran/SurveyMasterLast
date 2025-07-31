import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-details',
  standalone: false,
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.css'
})
export class SurveyDetailsComponent implements OnInit {
 survey: any;
currentQuestionIndex: number = 0;
  currentQuestion: any;

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
        this.surveyService.addRadioResult(response.questionId,response.selectedIndex).subscribe({
      next: async (data) => {

     console.log("done");
     
      },
      error: (err) => {
        console.error('Errora adding result:', err);
   }
});

    }
    else if(response.questionType==="text"){
      this.surveyService.addStringResult(response.questionId,response.textResponse).subscribe({
     next: async (data) => {

     console.log("done string ");
     
      },
      error: (err) => {
        console.error('Errora adding result:', err);
   }
      });
    }
    else{
      this.surveyService.addaddChickBoxResult(response.questionId,response.selectedIndexes).subscribe({
             next: async (data) => {

     console.log("done checkbox");
     
      },
      error: (err) => {
        console.error('Errora adding result:', err);
   }
      });
    }
    console.log(response);
    
    return response;
  });


}
}
