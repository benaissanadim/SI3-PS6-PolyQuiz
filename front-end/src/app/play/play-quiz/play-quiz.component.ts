import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Answer, Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {
  indexQuiz: number = 0;
  selectedAnswer = new Map();
  public question: Question;
  public answer: Answer;
  public quiz: Quiz;
  public user: User;
  resultAffiche : boolean = false;
  listAnswer : Answer[];
  toYesNo : boolean = false;
  begin: boolean = true;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private userService: UserService,) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    this.userService.userSelected$.subscribe((user) => (this.user = user));
  }
  ngOnInit(): void {
    setTimeout(() => {this.begin= false},4000);
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(idQuiz);
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
  }
  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }
  getAnswers(question: Question){
    this.listAnswer = question.answers;
    return question.answers;
  }
  deleteFalse(question: Question,answer: Answer): void {
    const index = question.answers.indexOf(answer);
    question.answers.splice(index, 1);
  }
  getCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        return this.quiz.questions[this.indexQuiz].answers[i];
      }
    }
  }
  resultDisplay(){
    this.resultAffiche = true;
    setTimeout(() => {this.resultAffiche = false; this.indexQuiz++;
      if(this.indexQuiz === this.quiz.questions.length && this.user.withRecap ){
        console
        this.toYesNo = true;
              setTimeout(() => {this.toYesNo = false; }, 4000);
      }
    }, 4000);
  }
  answerQuestion(answer: Answer){
    if(answer.isCorrect) {
      this.resultDisplay()
    }else{
      if (this.user.deleteFalseAnswer) {
        this.deleteFalse(this.quiz.questions[this.indexQuiz],answer);
      } else {
        this.resultDisplay();
      }
    }
  }
}
