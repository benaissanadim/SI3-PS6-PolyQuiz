export interface QuizHistory {
  id: any;
  name: string;
  quizId: string;
  userId: string;
  questions : QuestionHistory[]
}

export interface QuestionHistory {
  id: any;
  nom: string;
  nbCorrect ?: number
  answers: AnswerHistory[] ;
  recaps :AnswerHistory[];
}

export interface AnswerHistory {
  questionHistoryId: any,
  userId : any,
  answer : string,
  correct : boolean,
  date : any
}