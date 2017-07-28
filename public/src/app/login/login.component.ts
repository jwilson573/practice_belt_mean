import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = {};
  errors = [];
  constructor(private _userService: UserService, private _router: Router) { }


  createUser(){
    // Initialize an empty array of errors
    this.errors = [];
    return this._userService.createUser(this.newUser)
    .then(user => {
      console.log(user)
      if(user.errors){
        for(let key in user.errors){
          console.log(user.errors[key].message)
          this.errors.push(user.errors[key].message)
        }
      } else {
        // Saves the user into session
        this._userService.setCurrentUser(user);
        this._router.navigateByUrl('/questionsDash')
      }
    })
    .catch(err => console.log(err));
  }


  ngOnInit() {
  }

}
