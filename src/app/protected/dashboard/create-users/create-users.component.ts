import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})

export class CreateUsersComponent implements OnInit {

  usuario: Usuario | undefined;
  submmited: boolean = false;
  
  @Output() setUsuario = new EventEmitter<Usuario>();

  miFormulario: FormGroup = this.fb.group({
    firstname       : ['', [Validators.required]],
    lastname        : ['', [Validators.required]],
    username        : ['', [Validators.required]],
    password        : ['', [Validators.minLength(6) ,Validators.required]],
    confirmPassword : ['', [Validators.minLength(6), Validators.required ]],
    dob             : ['', [Validators.required]],
    role_id         : ['', [Validators.required]]
  })
  
  constructor( private authService: AuthService,
                private router: Router,
                private fb: FormBuilder ) { }

   ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
    }
    this.getUser();
  }

  getUser(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      this.authService.getUserData(token, user_id)
      .subscribe((resp)=>{
        this.usuario = resp.usuario;
        this.setUsuario.emit(this.usuario);
      })
    }
  }

  volver(){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
    }
    this.router.navigateByUrl('/dashboard');
  }

  createUsers(){
    const token = localStorage.getItem('token');
    if(token){
      const { firstname, lastname, username, password, dob, role_id } = this.miFormulario.value;
      this.authService.createUser( firstname.toUpperCase(), lastname.toUpperCase(), username.toLowerCase(), password, dob, role_id )
      .subscribe( (resp)=> {
        console.log(resp);
        this.miFormulario.reset();
        this.submmited = true;
      })
    }
  }

  

}
