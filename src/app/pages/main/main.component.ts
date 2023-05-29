import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
    `
    .wrapper{
      width: 100vw;
    }
    `
  ]

})


export class MainComponent {

  

  constructor( private fb: FormBuilder,
               private authService: AuthService ) { }


  getYear(){
    const year = new Date().getFullYear();
    return year;
  }

  

}
