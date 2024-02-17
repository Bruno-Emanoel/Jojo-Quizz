import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz-questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title = '';

  questions:Pergunta[] = [];
  questionSelected:Pergunta = {
    id:1,
    question:'',
    options:[]
  };

  answers:Option[] = []

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  results:any;
  result:any = {
    img:'',
    result:''
  };

  pointTracker:Tracker = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0
  }

  constructor(){ }

  ngOnInit():void{
    if(quizz_questions){
      this.finished = false;
      this.title=quizz_questions.title;

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      this.answers = this.questionSelected.options;
      this.results = quizz_questions.results;
    }
  }

  viewerChoose(points:Alias):void{
    for(let key in points){
      this.pointTracker[key] += (points as Tracker)[key] || 0;
    }
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex++;
    if (this.questionIndex<this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
      this.answers = this.questionSelected.options;
    } else {
      this.finished = true;

      let final:string = 'A';
      for(let key in this.results){
        final = this.pointTracker[key]>this.pointTracker[final]?key:final;
      }
      this.result.result = this.results[final].result;
      this.result.img = this.results[final].img;

    }
  }

}

type Option = {
  id:number,
  name:string,
  alias:Alias
}

type Pergunta = {
  id:number,
  question:string,
  options:Option[]
}

type Alias = {
  A?: number,
  B?: number,
  C?: number,
  D?: number,
  E?: number,
  F?: number,
  G?: number,
  H?: number,
  I?: number,
  J?: number,
  K?: number,
  L?: number,
  M?: number,
  N?: number,
  O?: number,
  P?: number,
  Q?: number
}
type Tracker = {
  [key: string]: number;

}
