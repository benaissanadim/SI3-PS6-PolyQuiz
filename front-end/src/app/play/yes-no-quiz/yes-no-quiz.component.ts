import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
@Component({
  selector: 'app-yes-no-quiz',
  templateUrl: './yes-no-quiz.component.html',
  styleUrls: ['./yes-no-quiz.component.scss']
})
export class YesNoQuizComponent implements OnInit {
  indexQuiz: number = 0;
  CorrectAnsw: number = 0;
  public question: Question;
  public answer: Answer;
  public quiz: Quiz;
  resultAffiche : boolean = false;
  answerToPrint : Answer;
  valueAdded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }
  ngAfterViewInit(){
    this.answerToPrint = this.printAnswer();
  }
  getCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
      if (this.quiz.questions[this.indexQuiz].answers[i].isCorrect) {
        return this.quiz.questions[this.indexQuiz].answers[i];
      }
    }
  }
  printAnswer(){
    if(this.valueAdded === false){
      const rand = Math.floor(Math.random() * this.quiz.questions[this.indexQuiz].answers.length);
      this.answerToPrint =  this.quiz.questions[this.indexQuiz].answers[rand];
      this. valueAdded = true ;
    }
    return this.answerToPrint ;
  }
  incrementCorrect(answerr) {
    if(answerr === this.printCorrect()) {
      this.CorrectAnsw++;
    }
    this.resultAffiche = true;
    setTimeout(() => {this.resultAffiche = false; this.indexQuiz++;  this.valueAdded = false }, 1000);
  }
  printCorrect(){
    if(this.answerToPrint.value === this.getCorrectAnswer().value) return "True"
    else return "False"
  }
}
