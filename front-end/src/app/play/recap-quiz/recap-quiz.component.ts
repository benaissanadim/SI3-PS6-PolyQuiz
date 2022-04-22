import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer, Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-recap-quiz',
  templateUrl: './recap-quiz.component.html',
  styleUrls: ['./recap-quiz.component.scss']
})
export class RecapQuizComponent implements OnInit {
  public question: Question;
  public answer: Answer;
  public quiz: Quiz;
  public idUser : string;
  @Input()
  questions : Question[]
  
constructor(private route: ActivatedRoute,private quizService: QuizService, 
  private userService: UserService,private router: Router) {
    this.quizService.quizSelected$.subscribe((quiz) => (this.quiz = quiz));
  }

  ngOnInit(): void {
    console.log(this.questions)
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(idQuiz);
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(this.idUser);
  }

  getCorrectAnswer(index) {
    for (let i = 0; i < 4; i++) {
      if (this.quiz.questions[index].answers[i].isCorrect) {
        return this.quiz.questions[index].answers[i];
      }
    }
  }

  replay(){
    window.location.reload();
  }
  
  exit(){
    console.log("test")
    this.router.navigate(['/quiz-list/'+this.idUser]);
  }

}