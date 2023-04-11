import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [`

  .hero-content {
    position: relative;
  }

  .hero-content img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    object-position: center bottom;
  }

  .text-overlay {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    /* background: red; */
    width: 300px;
  }

  .hero-content h1, .hero-content p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: white;
  }

  h1{
    line-height: 50px;
  }

  .img-person {
    max-height: 500px;
    display: block;
    margin: auto;
}

  .contenedor{
    height: 650px;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.5rem;
  }

  .hero-content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }

  .max-height-650 {
    height: 650px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
  }

  .carousel-item img {
    max-height: 500px;
    object-fit: cover;
  }

  .carousel-item-overlay {
  position: relative;
  }

  .carousel-item-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .carousel-item-overlay .carousel-caption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: #fff;
    text-align: center;
  }

  .carousel-item-overlay .carousel-caption h5 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .carousel-item-overlay .carousel-caption p {
    font-size: 1rem;
    margin: 0;
  }

  .carousel-control-prev, .carousel-control-next {
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
  }


  .max-with-100vw{
    width: 100vw;
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .form-column h2{
    margin-left: 100px;
    margin-bottom: 20px;
  }

  .form-contact{
    margin-left: 100px;
    width: 80%;
  }

  select{
    margin-left: 15px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    :focus{
      border-color:red;
    }
  }

`]

})


export class MainComponent {

  miFormulario: FormGroup = this.fb.group ({
    firstname: ['', [ Validators.required ] ],
    lastname: [ '', [ Validators.required ] ],
    phone: [ '', [ Validators.required] ],
    email: [ '', [ Validators.required, Validators.email] ],
    possible_appt: [ '', [ Validators.required] ],
    message: [ '', [ Validators.required] ]
  })

  constructor( private fb: FormBuilder,
               private authService: AuthService ) { }


  getYear(){
    const year = new Date().getFullYear();
    return year;
  }

  enviar(){
    console.log(this.miFormulario.value);
    const { firstname, lastname, phone, email, possible_appt, message } = this.miFormulario.value;
    this.authService.sendMessage(firstname, lastname, phone, email, possible_appt, message)
    .subscribe( resp => {
      console.log(resp);
      this.miFormulario.reset()
    })
    
    
    
  }

}
