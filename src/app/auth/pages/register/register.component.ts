import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    firstname: [ '', [Validators.required ]],
    lastname: [ '', [Validators.required ]],
    username: [ '', [Validators.required ]],
    password: [ '', [Validators.required, Validators.minLength(6) ]],
    dob: [ '', [Validators.required ]],
    role_id: [ '2', [Validators.required ]]
  });
  
  constructor( private fb: FormBuilder,
                private router: Router ) { }

  registro(){
    console.log(this.miFormulario.value);
        
    this.router.navigateByUrl('/dashboard')
  }

}
