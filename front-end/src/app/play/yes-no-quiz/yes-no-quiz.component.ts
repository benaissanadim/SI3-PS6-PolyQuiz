import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { TextSpeechService } from '../../../services/text-speech.service';

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
  @Input()
  questions : Question[]

  constructor( private textspeechService: TextSpeechService,
    private route: ActivatedRoute,
    private quizService: QuizService,) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
  }
  ngOnInit(): void {
    console.log(this.questions)
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(idQuiz);
  }
  isEnd() {
    return this.indexQuiz >= this.questions.length;
  }
  ngAfterViewInit(){
    this.speak();
    this.answerToPrint = this.printAnswer();
  }
  getCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
      if (this.questions[this.indexQuiz].answers[i].isCorrect) {
        return this.questions[this.indexQuiz].answers[i];
      }
    }
  }

  
  public speak(){
    if (this.indexQuiz >= 0) {
      if (!this.resultAffiche) this.speakQuestion();
      else this.speakResultat()
    }
  }


  public speakQuestion(): void {
    var text = this.questions[this.indexQuiz].label + '\n';
    text+= 'C est : ' + this.printAnswer().value+ '?\n';
    text += '1- VRAI \n 2- FAUX'
    this.textspeechService.speak(text);


  }

  public speakResultat(): void {
    var text = 'la reponse correcte est : \n' + this.printCorrect();
    this.textspeechService.speak(text);

  }

  printAnswer(){
    if(this.valueAdded === false){
      const rand = Math.floor(Math.random() * this.questions[this.indexQuiz].answers.length);
      this.answerToPrint =  this.questions[this.indexQuiz].answers[rand];
      this. valueAdded = true ;
    }
    return this.answerToPrint ;
  }
  incrementCorrect(answerr) {
    if(answerr === this.printCorrect()) {
      this.CorrectAnsw++;
    }
    this.resultAffiche = true;
    this.speak();
    setTimeout(() => {this.resultAffiche = false; this.indexQuiz++;  this.valueAdded = false; this.speak(); }, 6000);
  }
  printCorrect(){
    if(this.answerToPrint.value === this.getCorrectAnswer().value) return "Vrai"
    else return "Faux"
  }
}
