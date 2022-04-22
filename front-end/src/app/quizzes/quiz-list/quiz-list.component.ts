import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  
  idUser:Number;

  user: User;

  constructor(private router: Router, public quizService: QuizService,private route: ActivatedRoute,
    private userService: UserService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    console.log('url')
    console.log(this.router.url)

  }

  ngOnInit() {
    this.idUser = +this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(this.idUser.toString())
    this.userService.userSelected$.subscribe((userr: User) => {
      this.user = userr;
    });
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  editQuiz(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/'+ quiz.name]);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }
}
function input() {
    throw new Error('Function not implemented.');
}

