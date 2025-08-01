import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
constructor (private surveyService : SurveyService ,private authservice : AuthService ,private toastr: ToastrService ){
 
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
                  this.toastr.error('all notifications deleted');
        setTimeout(() => {
        window.location.reload();
      }, 2000);

         }    
  
      });
   }
    deleteNotification(notificationId:number){
      this.surveyService.deleteNotification(notificationId);
      this.toastr.error('notification deleted');
        setTimeout(() => {
        window.location.reload();
      }, 2000);
    
    }
 }
