import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionDashboardComponent } from './question-dashboard/question-dashboard.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'questionsDash', component: QuestionDashboardComponent },
  { path: 'new-question', component: NewQuestionComponent },
  { path: 'view-question/:id', component: QuestionComponent },
  { path: 'question/:id/new_answer', component: AnswerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
