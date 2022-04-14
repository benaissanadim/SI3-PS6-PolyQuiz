export interface QuizHistory {
  id: any;
  userId: string;
  name: string;
  date: any;
}


export interface AnswerHistory {
  id: any;
  quizHistoryId: number;
  question: string;
  answer: string;
  correct: boolean;
}
