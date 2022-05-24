import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  public questionForm: FormGroup;
  id : string
  nbAnswer =0;
  alertMax = false;
  alertMin = true;

  constructor(private route: ActivatedRoute, public router : Router,
              public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      indice:[''],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      image: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    if(this.nbAnswer <4){
      this.nbAnswer ++;
      if(this.nbAnswer==2) this.alertMin = false;
      this.answers.push(this.createAnswer());}
    else{
      this.alertMax = true;
    }
  }

  addQuestion() {
    if(this.questionForm.valid) {
      let question = this.questionForm.getRawValue() as Question;
      question.indice = 'hello';
      this.quizService.addQuestion(this.id, question);
      this.initializeQuestionForm();
      this.router.navigateByUrl('/edit-quiz/'+this.id+'/1')
    }
  }
}
