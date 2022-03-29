import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import {User} from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';


@Injectable({
  providedIn: 'root'
})

export class UserService{

  private users : User[] = [];
  public users$ :  BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http : HttpClient) {
    this.setUsersFromUrl();
  }

  setUsersFromUrl() {
    this.http.get<User[]>(this.userUrl).subscribe((quizList) => {
      this.users = quizList;
      this.users$.next(this.users);
    });
  }

  addUser(user:User){
    this.http.post<User>(this.userUrl,user,this.httpOptions).subscribe(() =>this.setUsersFromUrl());
  }

  deleteUser(quiz: User) {
    const urlWithId = this.userUrl + '/' + quiz.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }


}

