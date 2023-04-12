import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { filter, switchMap } from "rxjs/operators";
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';


type NewType = Message;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [
    `
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
      text-align: left;
    }

    pre{
      font-weight: normal;
      font-size:0.9rem; 
    }
    `
  ]
})
export class MessagesComponent implements OnInit {

  volverUrl: string = '/dashboard';
  usuario: Usuario | undefined;
  messages: Message[] = [];
  selectedMessage: Message | null = null;
  message_id: number = 0;
  mensajeSeleccionado!: Observable<Message | null>;

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
  
  setUsuario(usuario: Usuario):void {
    this.usuario = usuario;
  }

  onUsuarioChange(usuario:Usuario):void {
    this.setUsuario(usuario);
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

  back(): void {
    this.router.navigateByUrl('./dashboard');
  }
  

}

