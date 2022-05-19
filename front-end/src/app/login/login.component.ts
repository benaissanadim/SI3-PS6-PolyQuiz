import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    public user: User;
    public idUser : String
  errormessage = false;


    constructor(public router : Router,private userService : UserService){


    }


 ngOnInit() {
  this.user = {
    id: '0',
    name:'',
    password:'',
    disabledQuestions:[],
  };
}

login(){

  this.userService.getUserLogin(this.user.name, this.user.password);

  console.log("test")

  let userr : User
  this.userService.userSelectedlogin$.subscribe((user : User) =>{
    userr= user[0];
    console.log(userr)
    if(userr){
      if(userr.role ===0)
      this.router.navigate(['/quiz-list/'+ userr.id+'/'+ userr.name]);
      else  this.router.navigate(['/choice-admin/'+ userr.id]);
    }else{
      this.errormessage = true;
    }


  } );

}




  }
