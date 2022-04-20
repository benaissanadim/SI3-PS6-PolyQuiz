import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { AnswerHistory, QuizHistory } from '../models/quiz-history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private httpOptions = httpOptionsBase;
  private quizHistories: QuizHistory[] = [];
  public quizHistories2: QuizHistory[] = [];


  public quizHistories$: BehaviorSubject<QuizHistory[]> = new BehaviorSubject(this.quizHistories);
  public quizHistories2$: BehaviorSubject<QuizHistory[]> = new BehaviorSubject(this.quizHistories);

  public quizHistorySelected$: Subject<QuizHistory> = new Subject();

  private quizHistoryUrl = serverUrl + '/history';

  constructor(private http: HttpClient) {
  }


  setHistoriesUserFromUrl(userId : string) {
    console.log("test")
    this.http.get<QuizHistory[]>(serverUrl + '/history'+'/'+userId).subscribe((quizList) => {
      this.quizHistories = quizList;
      this.quizHistories$.next(this.quizHistories);
    });
  }

  addHistory(history : QuizHistory, userId : string){
    this.http.post<QuizHistory>(this.quizHistoryUrl,history,this.httpOptions).subscribe(() =>this.setHistoriesUserFromUrl(userId));
  }

  getHistories(userId:string , quizId : string){
    this.http.get<QuizHistory[]>(this.quizHistoryUrl+'/'+userId+'/'+quizId).subscribe((quizList) => {
      this.quizHistories2 = quizList;
      this.quizHistories2$.next(this.quizHistories2);
    }); 
  }

  getHistory(idHistory : string){
    this.http.get<QuizHistory>(this.quizHistoryUrl+'/one/'+idHistory).subscribe((history) => {
      this.quizHistorySelected$.next(history);
    });
  }

  addAnswerHistory(idHistory: string, idQuestion : string, answer : AnswerHistory ){
    this.http.post<AnswerHistory>(serverUrl+'/answerHistory/'+idQuestion,answer,this.httpOptions).subscribe(() =>this.getHistory(idHistory));
  }



 

}
