import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = 'http://localhost:8088/api/surveys';
  private apiUrl1 = 'http://localhost:8088/users';

  constructor(private http: HttpClient) { }

  getSurveys() : Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSurvey(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
 


  createSurvey(surveyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, surveyData);
  }
  
 acceptSurvey(surveyId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/isAccepted/${surveyId}`, {});
}

IsFinished(surveyId:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/isFinished/${surveyId}`, {});
}

  getUnAcceptedSurvey(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/getUnAcceptedSurvey`);

  }
  getSurveyByUserId(userId:number):Observable<any>{
return this.http.get<any[]>(`${this.apiUrl}/findByUserId/${userId}`);
  }
   deleteSurvey(surveyId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${surveyId}`)
   }
    sendNotification(notification : any): Observable<any>{
      return this.http.post(`${this.apiUrl1}/sendNotification`,notification);
    }

    getNotification(userId : number):Observable<any> {
      return this.http.get<any[]>(`${this.apiUrl1}/getNotification/${userId}`);
    }

    deleteNotifications(userId:number):Observable<any> {
      return this.http.delete<any>(`${this.apiUrl1}/deleteNotificationByUserId/${userId}`);
    }
    deleteNotification(notificationId:number) {
      return this.http.delete(`${this.apiUrl1}/deleteNotificationById/${notificationId}`).subscribe({

       });
    }
   addRadioResult(questionId : number,index:number|any):Observable<any> {
return this.http.put(`${this.apiUrl}/radioResult/${questionId}/${index}`,{});
   }
   addStringResult(questionId:number,answer:String|any):Observable<any> {
    return this.http.put(`${this.apiUrl}/textResult/${questionId}`,answer);
   }
   addaddChickBoxResult(questionId:number,indexes:any):Observable<any> {
        return this.http.put(`${this.apiUrl}/checkBoxResult/${questionId}`,indexes);

   }
   
}
