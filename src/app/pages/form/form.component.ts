import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

sended: boolean = false;
showButton: boolean = true;

  miFormulario: FormGroup = this.fb.group ({
    firstname:      [ '', [ Validators.required ] ],
    lastname:       [ '', [ Validators.required ] ],
    phone:          [ '', [ Validators.required, this.isNumber()] ],
    email:          [ '', [  Validators.email ] ],
    possible_appt:  [ '', [ Validators.required] ],
    message:        [ '', [ Validators.required] ]
  })

  constructor( private authService: AuthService,
               private fb: FormBuilder ){ }

  enviar(){
    console.log(this.miFormulario.value);
    const { firstname, lastname, phone, email, possible_appt, message } = this.miFormulario.value;
    this.authService.sendMessage(firstname, lastname, phone, email, possible_appt, message)
    .subscribe( resp => {
      this.miFormulario.reset();
      this.sended = true;
      this.showButton = false;
    })
  }

  campoNoEsValido( campo: string ){
    return this.miFormulario.controls[campo].errors
    && this.miFormulario.controls[campo].touched
  }

  isNumber():ValidatorFn{
    return(control: AbstractControl): {[key: string]:any } | null => {
      const value = control.value;
      const isValid = !isNaN(value);
      return isValid ? null : { notNumber: {value: control.value } };
    };
  }
  
  emailValidator():ValidatorFn{
    return (control: AbstractControl): { [key: string ]: any } | null => {
      const value = control.value;
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const isValid = emailRegex.test(value);
      return isValid ? null : {invalidEmail: { value: control.value } };
    };
  }

}
