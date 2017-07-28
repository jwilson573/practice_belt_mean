import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { QuestionService } from './../question.service';
import { AnswerService } from './../answer.service';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  newAnswer = {user: '', question: ''};
  param_id: string;
  question = {_id: ''};
  currentUser = {_id: ''};
  errors = [];
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private route: ActivatedRoute,
  
  ) { 
    this.route.params.subscribe(param => {
    this.param_id = param.id
  })
  }

  ngOnInit() {
    this.currentUser = this._userService.getCurrentUser();
    this.getQuestion();
    this.isLoggedIn();

  }
  createAnswer(){
    this.errors = [];
    this.newAnswer.user = this.currentUser._id;
    this.newAnswer.question = this.question._id;
    return this._answerService.create(this.newAnswer)
    .then(answer => {
      if(answer.errors){
        // console.log(answer)
        for(let key in answer.errors){
          // console.log(answer)
          this.errors.push(answer.errors[key].message)
        }
        
      } else {
        this._router.navigateByUrl(`/view-question/${this.newAnswer.question}`)

      }
    })
    .catch(err => console.log(err));
  }
  isLoggedIn(){
    if(this._userService.getCurrentUser() == null){
      this._router.navigateByUrl('/');
    }
  }

  getQuestion(){
    console.log('param_id: ', this.param_id);
    return this._questionService.show(this.param_id)
    .then(question => {
      console.log(question);
      this.question = question
    })
    .catch(err => { console.log(err)});
  }

  logout(){
    this._userService.logout();
    this._router.navigateByUrl('/');
  }

}
