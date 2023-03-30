import { Component, OnInit } from '@angular/core';
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { switchMap, filter } from "rxjs/operators";
import jwt_decode from "jwt-decode";


type NewType = Message;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [
    `
    *{
      margin: 15px;
    }

    h1{
      font-size: 1.6rem;
    }

    .table td, .table th {
      padding: 0.8rem; // ajustar según la altura deseada
      /* vertical-align: middle; // para alinear el contenido verticalmente */
    }

    th{
      font-size: 1.3rem;
      height:20px;
    }

    td{
      font-size: 1rem;
    }

    .modal-header h1.modal-title {
      font-size: 1.8em;
    }

    .modal-dialog {
      width: 38%;
      max-width: 1200px;
      height: 20%;
      margin: 0 auto;
    }

    pre{
      font-weight: normal;
      font-size:0.9rem; 
    }
    `
  ]
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  selectedMessage: Message | null = null;
  message_id: number = 0;
  mensajeSeleccionado!: Observable<Message | null>;
  usuario: Usuario | undefined;

  constructor( private authService: AuthService,
               private activatedRoute: ActivatedRoute,
               private router : Router ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if(!token){
      this.router.navigateByUrl('/auth');
      return;
    }

    this.activatedRoute.queryParams
    .pipe(
      switchMap(params => this.authService.getMessage(params['message_id'])),
      filter(mensaje => mensaje !== null)
    )
    .subscribe(
      message => {
        this.selectedMessage = message;
      },
      error => {
        console.error(error);
      }
    );

  }
 

  back(){
    this.router.navigateByUrl('/dashboard');
  }
  

  cambiarStatus( message_id: number ){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
      return;
    }
    const decodedToken: any = jwt_decode(token);
    const user_id = decodedToken.user_id;
    this.authService.updateMessageStatus(token, user_id, message_id)
      .subscribe(response => {
        console.log(response.message_users_id);
        console.log(response.fecha_cambio);
        console.log('El mensaje fue actualizado con exito!');
        this.router.navigateByUrl('/dashboard');
      }, error => {
        console.log(error, 'El mensaje no se pudo actualizar');
      });

  }
  

}

