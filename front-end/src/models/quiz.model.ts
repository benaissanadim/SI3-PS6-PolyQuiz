import { Question } from './question.model';

export interface Quiz {
  id?: string;
  name: string;
  theme?: string;
  image?:string;
  questions: Question[];
}
