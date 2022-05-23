import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  id: number;

  @Output()
  userSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  editUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(public router : Router) {
  }

  ngOnInit() {
  }

  selectQuiz() {
    this.userSelected.emit(true);
  }

  edit() {
    this.editUser.emit(this.user);
  }

  delete() {
    this.deleteUser.emit(this.user);
  }
  history(){
    this.router.navigate(['/user-history/'+this.user.id]);
  }
}
