import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AnswerHistory, QuizHistory } from 'src/models/quiz-history.model';
import { User } from 'src/models/user.model';
import { HistoryService } from 'src/services/history.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-quiz-history-details',
  templateUrl: './quiz-history-details.component.html',
  styleUrls: ['./quiz-history-details.component.scss']
})
export class QuizHistoryDetailsComponent implements OnInit {

  public user: User;
  public history: QuizHistory;
  public answers: AnswerHistory[];
  loaded = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.loaded = false;
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser('' + id);
    this.userService.userSelected$.subscribe((user: User) => {
      this.user = user;
      if (this.user) {
        this.getUserHistory();
      }
    });
  }

  getUserHistory(): void {
    const id = +this.route.snapshot.paramMap.get('historyId');
    this.historyService.setSelectedQuizHistory('' + id);
    this.historyService.quizHistorySelected$.subscribe((hist) => {
      this.history = hist;
      if (this.history) {
        this.getAnswerHistory();
      }
    });
  }

  getAnswerHistory(): void {
    this.historyService.retrieveAnswerHistory('' + this.history.id);
    this.historyService.answerHistories$.subscribe((answers) => {
      this.answers = answers;
      if (this.answers) {
        this.loaded = true;
      }
    });
  }
  
}
