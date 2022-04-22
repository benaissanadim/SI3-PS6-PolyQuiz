import {Component,OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector:'app-users-user-edit',
  templateUrl:'./user-edit.component.html',
  styleUrls:['user-edit.component.scss']
})
export class UserEditComponent implements OnInit{

  public user:User;
  loaded = false;

  constructor( public router : Router, public formBuilder: FormBuilder, private userService: UserService , public route : ActivatedRoute) {
       this.userService.userSelected$.subscribe((user) => (this.user = user));
  }

  ngOnInit(){
    const idUser = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(idUser);
    
  }
  updateUser(){
    if (this.user.image === '')
      this.user.image = '/assets/profile.png';
    this.userService.updateUser(this.user);
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

