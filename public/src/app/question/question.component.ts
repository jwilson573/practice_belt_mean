import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { QuestionService } from './../question.service';
import { AnswerService } from './../answer.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question = { answers: [] };
  param_id: string;
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private route: ActivatedRoute,
  ) 
  { 
    this.route.params.subscribe(param => {
    this.param_id = param.id
  })
  }

  ngOnInit() {
    this.isLoggedIn();
    this.getQuestion();
  }

   isLoggedIn(){
    if(this._userService.getCurrentUser() == null){
      this._router.navigateByUrl('/');
    }
  }

  getQuestion(){
    return this._questionService.show(this.param_id)
    .then(question => {
      console.log(question)
      this.question = question
    })
    .catch(err => { console.log(err)});
  }

  logout(){
    this._userService.logout();
    this._router.navigateByUrl('/');
  }

  increaseLikes(id: string, idx: number){
    return this._answerService.increaseLikes(id)
    .then(answer => this.question.answers[idx].likes++)
    .catch(err => console.log(err));
  }
}
