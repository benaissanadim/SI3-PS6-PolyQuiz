export interface Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
  image?: string;
}

export interface Question {
  id: string;
  label: string;
  indice?:string;
  answers: Answer[];
  image?:string;
}
