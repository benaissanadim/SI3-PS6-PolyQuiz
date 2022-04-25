import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerHistory, QuestionHistory, QuizHistory } from 'src/models/quiz-history.model';
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
  private quizHistory: QuizHistory;
  private answerHistory: AnswerHistory;
  public question: Question;
  public quiz: Quiz;
  public user: User;
  indice : boolean = false
  resultAffiche: boolean = false;
  listAnswer: Answer[];
  questionList: Question[];
  toYesNo: boolean = false;
  begin: boolean = true;
  indexQuiz: number = -1;

  questionIndex: number = 0;
  CorrectAnsw: number = 0;
  pourcentage: number;
  answer: number;
  info = "Veuillez attendre l'ouverture de votre microphone après 10 secondes pour insérer votre réponse."
  voiceInfo : String ;
  idQuiz : any;
  idUser : any;
  text: String = "";

  constructor( private route: ActivatedRoute, private quizService: QuizService,private http: HttpClient,
    private userService: UserService, private textspeechService: TextSpeechService, public historyService: HistoryService,
    public service: VoiceRecognitionService) {
    this.service.init();
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
    this.userService.userSelected$.subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.quizHistory = null;
    this.answerHistory = null;
    this.voiceInfo = this.info;
    setTimeout(() => {
      this.begin = false, this.indexQuiz++ ; this.speak();
      setTimeout(()=> {
        this.startVoice(0)
     },15000);
    }, 2000);
    this.idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(this.idQuiz);
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(this.idUser);

  }

  beginHistory(): void {
    this.historyService.getHistories(this.idUser, this.idQuiz)
    this.historyService.quizHistories2$.subscribe((histories: QuizHistory[]) => {
      this.quizHistory = histories[0];
    });
      setTimeout(() => {
         if(this.quizHistory === undefined){
           this.initHistory();}
      }, 1000);
  }

  initHistory(): void {
    const questionHistory :QuestionHistory[]  = []
    for(let i = 0 ; i< this.quiz.questions.length; i++){

      const quH = {
        id : this.getQuestion()[i].id,
        nom : this.getQuestion()[i].label,
        answers : [],
        recaps: []
      }
      questionHistory.push(quH);
    }

    this.quizHistory = {
      id: '',
      name: this.quiz.name,
      userId: this.user.id,
      quizId : this.quiz.id,
      questions : questionHistory
    };
    this.historyService.addHistory(this.quizHistory, this.user.id)

  }


  startVoice(id :number) {
    if(this.user.vocal)
    this.start(id);
  }

  speechRecogStop: boolean;
  start(id: number) {
    this.service.setText();
    this.voiceInfo = "vous avez dit "
     this.answer = 0;
    this.speechRecogStop = false;
    this.service.sound.start();
    console.log('Reconnaissance vocale commence');
    this.service.sound.addEventListener('end', () => {
    this.service.text = this.service.tempWords;

      console.log(this.service.text);
      let index = 0;
      let tab: Answer[] = [];
      for (let i = 0;i < this.getQuestion()[this.indexQuiz].answers.length;i++) {
        tab.push((this.getQuestion()[this.indexQuiz].answers[i]));
      }

      this.text = this.service.text;
      for (; index < tab.length; index++) {
        if (tab[index].value.toLowerCase() === this.service.text.toLowerCase()) {
          this.answer = index;
          this.speechRecogStop = true;
          this.service.text = "";
          break;
        }
      }
      console.log(tab)
      console.log("ok",index)
      if(this.speechRecogStop){
      if(!tab[index].isCorrect){
        this.deleteFalse(this.getQuestion()[this.indexQuiz], tab[index]);
        this.speechRecogStop = false
      }
      else {
        this.service.stop();
        this.text = ""
        document.getElementById('nombre' + index).style.backgroundColor =
          'rgb(94, 199, 85)';
        setTimeout(() => {
          this.resultDisplay()
          this.service.sound.stop();
        }, 4000);
      }}
      this.service.stop();
      if (id===0)    this.service.sound.start();
    });
  }

  public speak(){
    if (this.indexQuiz >= 0) {
      if (!this.resultAffiche) this.speakQuestion();
      else this.speakResultat()
    }
  }


  public speakQuestion(): void {
    var text = this.getQuestion()[this.indexQuiz].label + '\n';
    var i = 0;
    this.getQuestion()[this.indexQuiz].answers.forEach(ans => {
      i++;
      text += i + " " + ans.value + '\n'
    })
    this.textspeechService.speak(text);

  }

  public speakResultat(): void {
    var text = 'la reponse correcte est : \n' + this.getCorrectAnswer().value;
    this.textspeechService.speak(text);
  }

  removeDisabledQuestions(): void {
    const questToRemove: Question[] = [];
    this.questionList.forEach((question) => {
      if (this.user.disabledQuestions.indexOf(question.label) > -1) {
        questToRemove.push(question);
      }
    });
    this.questionList = this.questionList.filter( (el) => {
      return !questToRemove.includes(el);
    });
  }
  getQuestion(){
    this.questionList = this.quiz.questions
    this.removeDisabledQuestions();
    return this.questionList;
  }

  isEnd() {
    return this.indexQuiz >= this.getQuestion().length;
  }

  getAnswers() {
    this.listAnswer = this.getQuestion()[this.indexQuiz].answers;
    return this.listAnswer;
  }

  deleteFalse(question: Question, answer: Answer): void {
    const index = question.answers.indexOf(answer);
    question.answers.splice(index, 1);
  }

  getCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
      if (this.questionList[this.indexQuiz].answers[i].isCorrect) {
        return this.questionList[this.indexQuiz].answers[i];
      }
    }
  }

  resultDisplay() {
    this.indice = false
    this.resultAffiche = true;
    this.speak();
    setTimeout(() => {
      this.resultAffiche = false;
      this.indexQuiz++;
      this.speak();
      this.voiceInfo = this.info ;
      setTimeout(()=> {this.startVoice(1)},15000);
      if (this.indexQuiz === this.getQuestion().length && this.user.withRecap) {
        this.toYesNo = true;

      }
    }, 6000);
  }

  answerQuestion(answer: Answer) {
    this.beginHistory();
    setTimeout(() => {
      this.answerHistory = {
        date : Date.now(),
        answer : answer.value,
        correct : answer.isCorrect,
        userId : this.user.id,
        questionHistoryId : this.getQuestion()[this.indexQuiz].id
      }
      this.historyService.addAnswerHistory(this.quizHistory.id,this.getQuestion()[this.indexQuiz].id,this.answerHistory)
    this.textspeechService.stop();
    if (answer.isCorrect) {
      this.resultDisplay()
    } else {
      this.indice = true;
      if (this.user.deleteFalseAnswer) {
        this.deleteFalse(this.getQuestion()[this.indexQuiz], answer);
      }
      else {
        this.resultDisplay();
      }
    }}, 300);


  }
}
