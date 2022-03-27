import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public quizForm: FormGroup;


  constructor(private route: ActivatedRoute,public formBuilder: FormBuilder, private quizService: QuizService) { 
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      image:['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
  
}
