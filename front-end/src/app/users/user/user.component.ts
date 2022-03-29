import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  editUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
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
}
