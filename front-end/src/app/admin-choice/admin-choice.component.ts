import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-choice',
  templateUrl: './admin-choice.component.html',
  styleUrls: ['./admin-choice.component.scss']
})
export class AdminChoiceComponent implements OnInit {
  idUser : number;

  constructor(private router :Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idUser = +this.route.snapshot.paramMap.get('id');
    console.log(this.idUser)
  }

  navigateQuiz(){
    console.log(this.idUser)
    this.router.navigate(['quiz-list/'+this.idUser+'/admin']);
  }

  navigateUser(){
    this.router.navigate(['user-list']);
  }

}
