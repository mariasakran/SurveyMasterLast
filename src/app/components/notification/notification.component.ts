import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
constructor (private surveyService : SurveyService ,private authservice : AuthService  ){
 
}
user = JSON.parse(localStorage.getItem('user') || '{}'); 
notifications : any;
length : any;
  ngOnInit(): void {
       
      
    this.surveyService.getNotification(this.user.id).subscribe({
       next:async (data)=>{
          this.notifications= await data;
          console.log(this.notifications);
          length=this.notifications.length;
          
       }
    });   

  }
   deleteNotifications(){
      this.surveyService.deleteNotifications(this.user.id).subscribe({
         next:async (data)=>{
         }    
  
      });
   }
    deleteNotification(notificationId:number){
      alert("hello");
      this.surveyService.deleteNotification(notificationId);
    
    }
 }
