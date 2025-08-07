import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
@Component({
  selector: 'app-accept-survey-details',
  standalone: false,
  templateUrl: './accept-survey-details.component.html',
  styleUrl: './accept-survey-details.component.css',
})
export class AcceptSurveyDetailsComponent implements OnInit {
  message: string = '';
  survey: any;
  acceptedSurvey: any;
  isDeclined = false;
  notification: any;
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSurvey(+id);
    }
  }
  nextQuestion() {
    if (this.currentIndex < this.survey.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  loadSurvey(id: number): void {
    this.surveyService.getSurvey(id).subscribe({
      next: async (data) => {
        this.survey = await data;
      },
      error: (err) => {
        console.error('Error loading survey:', err);
      },
    });
  }

  acceptSurvey(id: number, message: string): void {
    this.surveyService.acceptSurvey(id).subscribe({
      next: (data) => {
        this.acceptedSurvey = data;
        this.emailService.sendNewSurvey(id).subscribe({
          next: () => {
            console.log('email sent');
          },
          error: (err) => {
            console.error('email error', err);
          },
        });
      },
      error: (err) => {
        console.error('Error accepting survey:', err);
      },
    });

    const createNotification = {
      userId: this.survey.userId,
      content: message || 'Your survey has been accepted!',
      title:
        'Accepted survey ' +
        this.survey.title +
        ' with category ' +
        this.survey.category,
    };

    this.surveyService.sendNotification(createNotification).subscribe({
      next: (data) => {
        this.notification = data;
        this.toastr.success('Survey accepted!', 'Success');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error sending notification:', err);
      },
    });
  }

  declineSurvey(id: number, message: string): void {
    this.surveyService.deleteSurvey(id).subscribe({});

    const createNotification = {
      userId: this.survey.userId,
      content: message,
      title:
        'declined survey ' +
        this.survey.title +
        ' have category ' +
        this.survey.category,
    };
    if (createNotification.content == '') {
      createNotification.content = 'your survey have been declined';
    }
    this.surveyService.sendNotification(createNotification).subscribe({
      next: async (data) => {
        this.notification = await data;
      },
      error: (err) => {
        console.error('Error send Notification :', err);
      },
    });
  }
}
