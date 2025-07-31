import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accept-survey-details',
  standalone: false,
  templateUrl: './accept-survey-details.component.html',
  styleUrl: './accept-survey-details.component.css'
})
export class AcceptSurveyDetailsComponent implements OnInit {
 message: string = '';
survey: any;
acceptedSurvey: any; 
isDeclined = false;
notification :any;
 


  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
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
      },
      error: (err) => {
       
        console.error('Error loading survey:', err);
   }
});
}

acceptSurvey(id: number,message: string): void{

  this.surveyService.acceptSurvey(id).subscribe({
     next: async (data) => {
        this.acceptedSurvey = await data;
      },
           error: (err) => {
       
        console.error('Error accept survey:', err);
   }
  });
  const createNotification={
    userId:this.survey.userId,
    content:message,
    title : "accepted survey "+this.survey.title +  " have category " + this.survey.category 
  };
  this.surveyService.sendNotification(createNotification).subscribe({
    next: async (data)=>{
      this.notification=await data;
      alert('done');
        },
           error: (err) => {
       
        console.error('Error send Notification :', err);
    }
  })

}

declineSurvey(id: number,message: string): void{
  this.surveyService.deleteSurvey(id).subscribe ({
  
  });

  const createNotification={
    userId:this.survey.userId,
    content:message,
    title : "declined survey "+this.survey.title +  " have category " + this.survey.category 

  };
  this.surveyService.sendNotification(createNotification).subscribe({
    next: async (data)=>{
      this.notification=await data;
        },
           error: (err) => {
       
        console.error('Error send Notification :', err);
    }
  });
  
}
 


}
