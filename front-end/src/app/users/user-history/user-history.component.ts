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


  current : String
  public user: User;
  public history: QuizHistory[];
  id : number
  historyQuiz: QuizHistory;
  afficher: boolean;

  constructor(private route: ActivatedRoute, private userService: UserService, private historyService: HistoryService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.historyQuiz = null ;
    this.getUser();
  }

  getUserHistory(): void {
    this.historyService.setHistoriesUserFromUrl(this.id.toString())
    this.historyService.quizHistories$.subscribe((histories: QuizHistory[]) => {
      this.history = histories;
    });
  }

  getNbCorrect(qu : any){
    let nb = 0;
    for(let i=0 ; i< qu.answers.length ; i++ ){
      if(qu.answers[i].correct) nb++;
    }
    return nb
  }

  getUser(): void {
    this.userService.setSelectedUser('' + this.id);
    this.userService.userSelected$.subscribe((user: User) => {
      this.user = user;
      if (user) {
        this.getUserHistory();
      }
    });
  }

  chooseQuizHistory(idH: string){
    this.historyService.getHistory(idH);
    this.historyService.quizHistorySelected$.subscribe((history: QuizHistory) => {
      this.historyQuiz = history;
    });

  }

  affiche(qu : any){
    this.current = qu.nom;
    this.afficher = true;
  }
  cacher(){
    this.afficher = false;
    console.log("called hidden")

  }
  isDisabled(question: string): boolean {
    return this.user.disabledQuestions.indexOf(question) > -1;
  }

  disable(question: string): void {
    console.log(this.user)
    console.log(this.user.disabledQuestions.indexOf(question));
    if (this.user.disabledQuestions.indexOf(question) > -1) {
      this.user.disabledQuestions.splice(this.user.disabledQuestions.indexOf(question), 1);
    } else {
      this.user.disabledQuestions.push(question);
    }
    this.userService.updateUser(this.user);

  }


}
