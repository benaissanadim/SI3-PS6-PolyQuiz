import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  user: User;

  @Input()
  idUser : Number
   

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor( private userService: UserService) {
  }

  ngOnInit() {
    this.userService.setSelectedUser(this.idUser.toString())
    this.userService.userSelected$.subscribe((userr: User) => {
      console.log(userr)
      this.user = userr;
      console.log(this.user)

    });
    console.log("final")

    console.log(this.user)

  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  edit() {
    this.editQuiz.emit(this.quiz);
  }

  delete() {
    this.deleteQuiz.emit(this.quiz);
  }
}
