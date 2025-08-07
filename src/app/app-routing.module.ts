import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { UserMangementComponent } from './components/user-mangement/user-mangement.component';
import { AcceptCategoryComponent } from './components/accept-category/accept-category.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MySurveyComponent } from './components/my-survey/my-survey.component';
import { SurveyResultComponent } from './components/survey-result/survey-result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { CodeConfirmComponent } from './components/code-confirm/code-confirm.component';
import { RestPassComponent } from './components/rest-pass/rest-pass.component';
const routes: Routes = [
  { path: '', redirectTo: 'Main', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'Main', component: MainComponent },
  { path: 'adduser', component: AddUSERComponent },
  { path: 'acceptsurvey', component: AcceptSurveyComponent },
  { path: 'addsurvey', component: AddSurveyComponent },
  { path: 'usermange', component: UserMangementComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: 'categorymange', component: CategoryMangmentComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'survey/:id', component: SurveyDetailsComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'surveydetails/:id', component: AcceptSurveyDetailsComponent },
  { path: 'acceptCategory', component: AcceptCategoryComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mySurvey', component: MySurveyComponent },
  { path: 'surveyResult/:id', component: SurveyResultComponent },
  { path: 'frogetPass', component: ForgetPassComponent },
  { path: 'confirmCode', component: CodeConfirmComponent },
  { path: 'restPass', component: RestPassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
