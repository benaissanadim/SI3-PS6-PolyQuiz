import {Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizHistory } from "src/models/quiz-history.model";
import { User } from "src/models/user.model";
import { HistoryService } from "src/services/history.service";
import { UserService } from "src/services/user.service";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})

export class UserHistoryComponent implements OnInit {


  public user: User;
  public history: QuizHistory[];

  constructor(private route: ActivatedRoute, private userService: UserService, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  getUserHistory(): void {
    this.historyService.recupQuizHistory();
    this.historyService.quizHistories$.subscribe((history) => {
      if (history) {
        this.history = this.historyService.getUserHistories(this.user.id).reverse();
      }
    });
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser('' + id);
    this.userService.userSelected$.subscribe((user: User) => {
      this.user = user;
      if (user) {
        this.getUserHistory();
      }
    });
  }
}




