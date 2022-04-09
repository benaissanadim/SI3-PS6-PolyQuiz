import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
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
  indexQuiz: number = -1;
  selectedAnswer = new Map();
  b: boolean;
  a: boolean;
  missClick: number = 0;
  CorrectAnsw: number = 0;
  questionIndex: number = 0;
  public question: Question;
  public answer: Answer;
  public quiz: Quiz;
  public user: User;
  resultAffiche: boolean = false;
  listAnswer: Answer[];
  toYesNo: boolean = false;
  begin: boolean = true;
  answernumb:number
  isStoppedSpeechRecog:boolean

  constructor(private route: ActivatedRoute, private quizService: QuizService,
              private userService: UserService, private textspeechService: TextSpeechService,
              private vocalservice : VoiceRecognitionService) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    this.userService.userSelected$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.begin = false, this.indexQuiz++
    }, 4000);
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(idQuiz);
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(idUser);
  }


  ngAfterViewChecked(): void {
    console.log(this.quiz)
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
    setTimeout(() => {
      this.resultAffiche = false;
      this.indexQuiz++;
      if (this.indexQuiz === this.quiz.questions.length && this.user.withRecap) {
        console
        this.toYesNo = true;
        setTimeout(() => {
          this.toYesNo = false;
        }, 6000);
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
  }

  start(id: String) {
    document.getElementById('sound').classList.add('animated');
    this.isStoppedSpeechRecog = false;
    this.vocalservice.sound.start();
    console.log('Reconnaissance vocale a commencé');
    this.vocalservice.sound.addEventListener('end', (condition) => {
      this.b = false;
      this.vocalservice.text = this.vocalservice.tempWords;

      console.log(this.vocalservice.text);

      let index = 0;
      let tab: string[] = [];
      for (
        let i = 0;
        i < this.quiz.questions[this.questionIndex].answers.length;
        i++
      ) {
        tab.push('numéro ' + i);
      }

      for (; index < tab.length; index++) {
        if (tab[index] == this.vocalservice.text) {
          this.answernumb = index;
          this.isStoppedSpeechRecog = true;
          break;
        }
      }

      if (this.isStoppedSpeechRecog) {
        this.vocalservice.stop();
        document.getElementById('nombre' + index).style.backgroundColor =
          'rgb(94, 199, 85)';
        // Correcte Answers
        setTimeout(() => {
          this.increment();
        }, 4000);
        this.isStoppedSpeechRecog = false;
        this.vocalservice.stop();
      }
      this.vocalservice.stop();
      this.vocalservice.sound.start();
    });
  }

  trueQuestionIndex(): number {
    const answers = this.quiz.questions[this.questionIndex].answers;
    for (let index = 0; index < answers.length; index++)
      if (answers[index].isCorrect) return index;
  }

  increment() {
    if (!this.isEnd()) {
      if (this.answernumb == this.trueQuestionIndex()) this.CorrectAnsw++;
      this.questionIndex++;
    }
  }





}
