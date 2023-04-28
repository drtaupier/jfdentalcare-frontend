import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Subscription } from 'rxjs';
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

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

    .table th{
      font-size: 1.2rem;
      background-color: #748D93;
      color: #F9F5F5;
      font-weight: normal;
    }

    td{
      font-size: 1rem;
      text-align: left;
    }

    pre{
      font-weight: normal;
      font-size:0.9rem; 
    }

    button[type="button"]{
      margin-bottom: 40px;
      padding: 5px 30px 9px 30px;
      border-radius: 4px;
      border: none;
      background: #2F2538;
      color: #F9F5F5;
      margin-right:10px;
      &:hover{
        cursor: pointer;
        background: #373825;
        border: none;
      }
      &:active{
        border:none;
      }
    }
    `
  ]
})
export class MessagesComponent implements OnInit {

  usuario: Usuario | undefined;
  // receivedMessage!: Message;
  receivedMessage: Message | null = null;

  private messageSubscription! : Subscription;

  constructor( private authService: AuthService,
               private router : Router) { }
  
    ngOnInit(): void {
      const token = localStorage.getItem('token')
      if(!token){
        this.router.navigate(['/auth']);
        return;
      }

      //Recibo el mensaje a traves de un Observable:
      this.messageSubscription = this.authService.message$
      .subscribe(message => {
      this.receivedMessage = message;
    });




      this.getUser();

    }

  getUser(): void{
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      this.authService.getUserData(token, user_id)
      .subscribe((resp) => {
        this.usuario = resp.usuario;
      });
    }
  }

  cambiarStatus(message_id: number){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      const status_id = 6;
      this.authService.createMessageUsers(token, message_id, status_id, user_id).subscribe( mensaje => console.log(mensaje) )
        this.router.navigate(['/dashboard']);
    }
  }


  back(): void {
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
      return;
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }

}


