import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
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
  CorrectAnsw: number = 0;
  selectedAnswer = new Map();
  public question: Question;
  public answer: Answer;
  public quiz: Quiz;
  public user: User;
  resultAffiche : boolean = false;
  idQuiz : string
  idUser : string



constructor(private route: ActivatedRoute, private quizService: QuizService,) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
  }

  ngOnInit(): void {
    this.idQuiz = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(this.idQuiz);
  }

  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }

  getCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        return this.quiz.questions[this.indexQuiz].answers[i];
      }
    }
  }

  incrementCorrect(answerr) {
    var correct = this.getCorrectAnswer().value;
    if (correct == answerr) {
      this.CorrectAnsw++;
    }
    this.resultAffiche = true;
    this.selectedAnswer.set(this.indexQuiz, answerr);
    setTimeout(() => {this.resultAffiche = false; this.indexQuiz++;     console.log(this.indexQuiz);    }, 5000);
  }

  deleteFalse(question: Question,answer: Answer): void {
    const index = question.answers.indexOf(answer);
    question.answers.splice(index, 1);
  }

  falseAnswerCase(question : Question , answer : Answer){
    if(this.user.deleteFalseAnswer){
      this.deleteFalse(question,answer);
    }
    else{
      this.incrementCorrect(answer);
    }
  }

  getUser(){

  }

  answerQuestion(answer: Answer){
    if(answer.isCorrect) {
      this.resultAffiche = true;
      setTimeout(() => {
        this.resultAffiche = false;
        this.indexQuiz++;
        console.log(this.indexQuiz);
      })
    }else{

      }
  }

}
