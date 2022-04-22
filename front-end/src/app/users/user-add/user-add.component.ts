import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from 'src/services/user.service';
import { User } from '../../../models/user.model';



@Component({
  selector: 'app-users-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit{

  public user: User;

  constructor( public router : Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = {
      id:'0',
      name:'',
      image:'',
      stade:'leger',
      withRecap:true,
      deleteFalseAnswer:false,
      hint:false,
      vocal:false
    };

  }

  addUser(){
    if (this.user.image === '')
    this.user.image = '/assets/profile.png';
    this.userService.addUser(this.user);
    this.router.navigate(['/user-list'])
  }


  addOptions(form: NgForm): void {
    switch (form.value.radioGroup) {
      case 'leger':
        this.user.hint = false;
        this.user.deleteFalseAnswer = false;
        this.user.withRecap = true;
        this.user.vocal = false ;
        break;
      case 'modere':
        this.user.hint = true;
        this.user.deleteFalseAnswer = true;
        this.user.withRecap = false;
        this.user.vocal = false ;
        break;
      case 'severe':
        this.user.hint = false;
        this.user.deleteFalseAnswer = false;
        this.user.withRecap = false;
        this.user.vocal = true 
        break;
    }
  }




}




