import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`

    button[type="submit"]{
      margin-bottom: 40px;
      padding: 10px 25px 10px 25px;
      border-radius: 8px;
      border: none;
      background: #1F2B50;
      color: #F9F5F5;
      &:hover{
        box-shadow: inset 0.3px 0.3px 5px 1px rgba(0,0,0,0.3);
        cursor: pointer;
        background: #5195A6;
        border: none;
        outline:none;
        transition-duration: 0.1s;
      }
      &:active{
        border:none;
      }
    }
    .landing{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .landing p a{
      color: #1F2B50;
      text-decoration: none;
      font-weight: 600;
      &:hover{
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 14px; // agrega un margen inferior de 5px al subrayado
        text-decoration-thickness: 2px;
      }
    }
  `]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group ({
    username: ['drtaupier@gmail.com', [Validators.required, Validators.email ]],
    password: ['123456', [Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,   
               private authService: AuthService ){
  }

    
  login():void{
    // console.log(this.miFormulario.value);
    const { username, password } = this.miFormulario.value;
  
    this.authService.login( { username, password }  )
      .subscribe(
        token => {
          if(token){
            this.router.navigateByUrl('/dashboard')
          }else{
            console.log('No se pudo obtener el token');
          }
        },
        error => {
          console.log('Error en la autenticación', error);
          this.miFormulario.setErrors({ 'authError': true });
        }
      );
  }

  
}
