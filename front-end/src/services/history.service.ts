import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {httpOptionsBase, serverUrl } from "src/configs/server.config";
import { Question } from "src/models/question.model";
import {AnswerHistory, QuizHistory } from "src/models/quiz-history.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private httpOptions = httpOptionsBase;

  private quizHistories: QuizHistory[] = [];
  public quizHistories$: BehaviorSubject<QuizHistory[]> = new BehaviorSubject(this.quizHistories);


  public quizHistorySelected$: Subject<QuizHistory> = new Subject();


  private answerHistories: AnswerHistory[] = [];
  public answerHistories$: BehaviorSubject<AnswerHistory[]> = new BehaviorSubject(this.answerHistories);

  private quizHistoryUrl = serverUrl + '/quizHistory';
  private answerHistoryUrl = '/answerHistory';

  constructor(private http: HttpClient) {
  }

  recupQuizHistory(): void {
    this.http.get<QuizHistory[]>(this.quizHistoryUrl).subscribe((newQuizHistories) => {
      this.quizHistories = newQuizHistories;
      this.quizHistories$.next(this.quizHistories);
    });
  }

  addQuizHistory(quizHistory: QuizHistory): void {
    const historyUrl = this.quizHistoryUrl;
    this.http.post<QuizHistory>(historyUrl, quizHistory, this.httpOptions).subscribe(() => this.recupQuizHistory());
  }

  getUserHistories(userId: string): QuizHistory[] {
    return this.quizHistories.filter(quizHistory => quizHistory.userId === userId);
  }

  retrieveAnswerHistory(quizHistoryId: string): void {
    const url = this.quizHistoryUrl + '/' + quizHistoryId + this.answerHistoryUrl;
    this.http.get<AnswerHistory[]>(url).subscribe((answerHistoryList) => {
      this.answerHistories = answerHistoryList;
      this.answerHistories$.next(this.answerHistories);
    });
  }

  addAnswerHistory(quizHistory: QuizHistory, answerHistory: AnswerHistory): void {
    const answerUrl = this.quizHistoryUrl + '/' + quizHistory.id + '/answerHistory';
    this.http.post<Question>(answerUrl, answerHistory, this.httpOptions).subscribe(() => this.setSelectedQuizHistory(quizHistory.id));
  }

  setSelectedQuizHistory(quizHistoryId: string): void {
    const urlWithId = this.quizHistoryUrl + '/' + quizHistoryId;
    this.http.get<QuizHistory>(urlWithId).subscribe((quizHistory) => {
      this.quizHistorySelected$.next(quizHistory);
    });
  }
}


