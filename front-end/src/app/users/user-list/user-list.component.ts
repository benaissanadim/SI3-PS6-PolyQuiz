import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  p: number =1;
  id : number;

  constructor(private route: ActivatedRoute,private router: Router, public userService: UserService) {
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

  }

  userSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  editUser(user: User) {
    this.router.navigate(['/edit-user/'+ user.name]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
}
