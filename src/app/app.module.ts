import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/subscription-info/about-us.component';
import { AcceptSurveyComponent } from './components/accept-survey/accept-survey.component';
import { AcceptSurveyDetailsComponent } from './components/accept-survey-details/accept-survey-details.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';
import { AddUSERComponent } from './components/add-user/add-user.component';
import { CategoryMangmentComponent } from './components/category-mangment/category-mangment.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { UserMangementComponent } from './components/user-mangement/user-mangement.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AcceptCategoryComponent } from './components/accept-category/accept-category.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MySurveyComponent } from './components/my-survey/my-survey.component';
import { SurveyResultComponent } from './components/survey-result/survey-result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { CodeConfirmComponent } from './components/code-confirm/code-confirm.component';
import { RestPassComponent } from './components/rest-pass/rest-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    AcceptSurveyComponent,
    AcceptSurveyDetailsComponent,
    AddCategoryComponent,
    AddSurveyComponent,
    AddUSERComponent,
    CategoryMangmentComponent,
    EditUserComponent,
    FavoriteComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    PaymentComponent,
    ProfileComponent,
    RegisterComponent,
    SidebarComponent,
    SurveyComponent,
    SurveyDetailsComponent,
    UserMangementComponent,
    AcceptCategoryComponent,
    NotificationComponent,
    MySurveyComponent,
    SurveyResultComponent,
    DashboardComponent,
    ForgetPassComponent,
    CodeConfirmComponent,
    RestPassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
