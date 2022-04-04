import {Component,OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector:'app-users-user-edit',
  templateUrl:'./user-edit.component.html',
  styleUrls:['user-edit.component.scss']
})
export class UserEditComponent implements OnInit{

  public user:User

  constructor( public router : Router,
               public formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(){
    
  }
}

