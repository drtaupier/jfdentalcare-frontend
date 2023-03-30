import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
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

    
  login(){
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
