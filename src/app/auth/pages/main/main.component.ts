import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [`
    .wrapper{
      background-color: #94929D;
      height: 100vh;
    }
    .formulario{
      height: 90vh;
    }
    .footer{
      width: 100vw;
      height: 10vh;
      background-color: #1F2B50;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footer-container p{
      color: #F9F5F5;
    }
  `
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getYear(){
    const year = new Date().getFullYear();
    return year;
  }

}
