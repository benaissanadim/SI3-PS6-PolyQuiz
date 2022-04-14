import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AnswerHistory, QuizHistory } from 'src/models/quiz-history.model';
import { User } from 'src/models/user.model';
import { HistoryService } from 'src/services/history.service';
import { UserService } from 'src/services/user.service';
import { VoiceRecognitionService } from 'src/services/voice-quiz-service';
import { Answer, Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { TextSpeechService } from '../../../services/text-speech.service';


@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {
  public question: Question;
  private quizHistory: QuizHistory;
  private answerHistory: AnswerHistory;
  public quiz: Quiz;
  public user: User;
  resultAffiche: boolean = false;
  listAnswer: Answer[];
  toYesNo: boolean = false;
  begin: boolean = true;
  indexQuiz: number = -1;

  questionIndex: number = 0;
  CorrectAnsw: number = 0;
  pourcentage: number;
  answer: number;
  info = "Veuillez attendre l'ouverture de votre microphone après 10 secondes pour insérer votre réponse."
  voiceInfo : String ;


  constructor( private route: ActivatedRoute, private quizService: QuizService,
    private userService: UserService, private textspeechService: TextSpeechService, public historyService: HistoryService,
    public service: VoiceRecognitionService) {
    this.service.init();
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    this.userService.userSelected$.subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.voiceInfo = this.info;
    this.quizHistory=null;
    this.answerHistory=null;

    setTimeout(() => {
      this.begin = false, this.indexQuiz++ ; this.speak();

      setTimeout(()=> {
        this.startVoice()
     },10000);
    }, 4000);
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(idQuiz);
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
      console.log("test")
    console.log(document.getElementById('sound'))
  }

  startVoice() {
    if(this.user.vocal)
    this.start('sound');
  }

  recordHistory(): void {
    this.quizHistory = {
      id: '',
      name: this.quiz.name,
      date: Date.now(),
      userId: this.user.id,
    };
    this.historyService.addQuizHistory(this.quizHistory);
  }

  speechRecogStop: boolean;
  start(id: String) {
    this.service.setText();
    this.voiceInfo = "vous avez dit "
    this.answer = 0;
    document.getElementById('sound').classList.add('animated');
    this.speechRecogStop = false;
    this.service.sound.start();
    console.log('Reconnaissance vocale commence');
    this.service.sound.addEventListener('end', () => {
    this.service.text = this.service.tempWords;

      console.log(this.service.text);
      let index = 0;
      let tab: string[] = [];
      for (let i = 0;i < this.quiz.questions[this.indexQuiz].answers.length;i++) {
        tab.push((this.quiz.questions[this.indexQuiz].answers[i].value));
      }
      console.log(tab)

      for (; index < tab.length; index++) {
        if (tab[index].toLowerCase() === this.service.text.toLowerCase()) {
          this.answer = index;
          this.speechRecogStop = true;
          this.service.text = "";
          break;
        }
      }

      if (this.speechRecogStop) {
        this.service.stop();
        document.getElementById('nombre' + index).style.backgroundColor =
          'rgb(94, 199, 85)';
        setTimeout(() => {
          this.resultDisplay()
          this.service.stop()
          this.service.sound.stop();
        }, 4000);
      }
      this.service.stop();
      this.service.sound.start();
    });
  }

  speak(){
    if (this.indexQuiz >= 0) {
      if (!this.resultAffiche) this.speakQuestion();
      else this.speakResultat()
    }
  }


  public speakQuestion(): void {
    var text = this.quiz.questions[this.indexQuiz].label + '\n';
    var i = 0;
    this.quiz.questions[this.indexQuiz].answers.forEach(ans => {
      i++;
      text += i + " " + ans.value + '\n'
    })
    this.textspeechService.speak(text);

  }

  public speakResultat(): void {
    var text = 'la reponse correcte est : \n' + this.getCorrectAnswer().value;
    this.textspeechService.speak(text);

  }

  isEnd() {
    return this.indexQuiz >= this.quiz.questions.length;
  }

  getAnswers(question: Question) {
    this.listAnswer = question.answers;
    return question.answers;
  }

  deleteFalse(question: Question, answer: Answer): void {
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

  resultDisplay() {
    this.resultAffiche = true;
    this.speak();
    setTimeout(() => {
      this.resultAffiche = false;
      this.indexQuiz++;
      this.speak();
      this.voiceInfo = this.info ;
      setTimeout(()=> {this.startVoice()},10000);
      if (this.indexQuiz === this.quiz.questions.length && this.user.withRecap) {
        this.toYesNo = true;
        setTimeout(() => {this.toYesNo = false;}, 6000);
      }
    }, 6000);
  }

  answerQuestion(answer: Answer) {
    this.textspeechService.stop();
    if (answer.isCorrect) {
      this.resultDisplay()
    } else {
      if (this.user.deleteFalseAnswer) {
        this.deleteFalse(this.quiz.questions[this.indexQuiz], answer);
      }
      else {
        this.resultDisplay();
      }
    }
    this.historyService.addAnswerHistory(this.quizHistory, this.answerHistory);
  }
}
