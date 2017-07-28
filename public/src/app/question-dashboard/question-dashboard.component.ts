import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { QuestionService } from './../question.service';
import { AnswerService } from './../answer.service';

@Component({
  selector: 'app-question-dashboard',
  templateUrl: './question-dashboard.component.html',
  styleUrls: ['./question-dashboard.component.css']
})
export class QuestionDashboardComponent implements OnInit {
  user = {};
  questions: any[] = [];
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
  ) { }

  ngOnInit() {

     // Gets current user on page load
     this.user = this._userService.getCurrentUser();
     this.getQuestions();
     this.isLoggedIn();
     
  }

  logout(){
    this._userService.logout();
    this._router.navigateByUrl('/');
  }

  isLoggedIn(){
    if(this._userService.getCurrentUser() == null){
      this._router.navigateByUrl('/');
    }
  }

  getQuestions(){
    return this._questionService.index()
    .then(questions => this.questions = questions)
    .catch(err => console.log(err));

  }


}
