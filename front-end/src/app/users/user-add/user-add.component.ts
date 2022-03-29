import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { User } from '../../../models/user.model';



@Component({
  selector: 'app-users-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit{

  public user: User;

  constructor(private route: ActivatedRoute, public router : Router,
              public formBuilder: FormBuilder, private quizService: QuizService) {

  }

  ngOnInit(): void {
    this.user = {
      id:'0',
      name:'',
      picture:'',
      stade:'',
      withRecap:false,
      deleteFalseAnswer:false,
      hint:false
    };

    
  }




}




