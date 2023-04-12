import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    .table td {
      padding: 0.25rem 0.20rem;
      font-size: 0.9rem;
      line-height: 1rem;
    }

    .table th{
      font-size: 1rem;
    }
  `
  ]
})
export class DashboardComponent implements OnInit {

  @Output() usuarioOutput = new EventEmitter<Usuario>();
  
  usuario: Usuario | undefined;
  messages: Message[] = [];

  constructor( private authService: AuthService,
               private router: Router ) {}

  
  
  ngOnInit() {
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
      return;
    }

    this.getUser();
    
    setInterval( () => {
      this.getUser();
    }, 300000);
  }

  
  getUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      this.authService.getUserData(token, user_id).subscribe((resp) => {
        this.usuario = resp.usuario;
        this.authService.getMessages().subscribe((resp) => {
          this.messages = resp;
        })
        this.usuarioOutput.emit(this.usuario)
      });
    }
  }


  getId( message_id : number ){
    const token = localStorage.getItem('token');
    if(token){
      this.authService.validarToken().subscribe(
        (response) => {
          this.router.navigate(['dashboard/message'], { queryParams: { message_id: message_id }});
        },
        (error) => {
          console.log(error);
          this.router.navigateByUrl('/auth');
          
        }
      )
    }
  }
  

}
