import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }


  createUser(user){
    return this._http.post('/users', user).map(data => data.json()).toPromise();

  }

  setCurrentUser(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
