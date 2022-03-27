import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { PlayQuizComponent } from './play/play-quiz/play-quiz.component';

const routes: Routes = [
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    {path: 'quiz-add', component : QuizFormComponent},
    {path: 'add-question/:id',component:  QuestionFormComponent },
    {path: 'quiz-play/:id',component: PlayQuizComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
