import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionComponent } from './questions/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayQuizComponent } from './play/play-quiz/play-quiz.component';
import { YesNoQuizComponent } from './play/yes-no-quiz/yes-no-quiz.component';
import { RecapQuizComponent } from './play/recap-quiz/recap-quiz.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import  {UserAddComponent} from './users/user-add/user-add.component';
import  {UserEditComponent} from './users/user-edit/user-edit.component';
import { UserHistoryComponent } from './users/user-history/user-history.component';
import { LoginComponent } from './login/login.component';

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    RecapQuizComponent,
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    PlayQuizComponent,
    YesNoQuizComponent,
    UserAddComponent,
    UserEditComponent,
    UserHistoryComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
