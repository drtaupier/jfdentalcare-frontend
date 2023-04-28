import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    phone:          [ '', [ Validators.required] ],
    email:          [ '', [ Validators.required, Validators.email] ],
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
  
}
