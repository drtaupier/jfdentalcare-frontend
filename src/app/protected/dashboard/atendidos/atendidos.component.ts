import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-atendidos',
  templateUrl: './atendidos.component.html',
  styleUrls: ['./atendidos.component.scss']
})
export class AtendidosComponent implements OnInit{

  usuario!: Usuario;
  messages: Message[] = [];
  message!: Message;

  constructor( private authService: AuthService,
               private router: Router){

}

  ngOnInit(): void {
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigateByUrl('/auth');
        return;
      }

      this.getUser()
      this.getMessages();
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

  getMessages(){
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getMessageUserAttended()
      .subscribe( (resp) =>{
        this.messages = resp;
      })
    }
  }

  getId(message_users_id: number) {
    console.log('message_users_id:', message_users_id);
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getMessage(token, message_users_id || -1)
        .subscribe(resp => {
          console.log(resp);
          this.message = resp;
        });
    }
  }


  
  
  


  
}

