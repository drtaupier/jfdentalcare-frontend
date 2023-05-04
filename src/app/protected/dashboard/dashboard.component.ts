import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { EMPTY, Observable, Subject, Subscription, switchMap, takeUntil, tap, timer } from 'rxjs';
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
      background-color: #748D93;
      color: #F9F5F5;
      font-weight: normal;
    }
  `
  ]
})
export class DashboardComponent  implements OnInit {
  
  usuario: Usuario | undefined;
  messages: Message[] = [];
  messageId!: Message;
  private messageSubscription!: Subscription;
  private userSubscription!: Subscription;
  private destroyed$ = new Subject<void>();
  
  @Output() setUsuario = new EventEmitter<Usuario>();

  constructor( private authService: AuthService,
               private router: Router ) {}
  

  
  ngOnInit() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigateByUrl('/auth');
    return;
  }

  // Suscríbete al evento messageUpdated$ y actualiza los mensajes cada vez que se emita
  this.authService.messageUpdated$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      this.getUser().subscribe();
    });

  // Llama a getUser() para obtener los datos iniciales
  this.getUser().subscribe();

  // Suscríbete al temporizador para actualizar los mensajes periódicamente
  this.userSubscription = timer(0, 300000)
    .pipe(switchMap(() => this.getUser()))
    .subscribe();
}
  
  
  getUser(): Observable<any> { // Cambia el tipo de retorno a Observable<any>
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      return this.authService.getUserData(token, user_id).pipe(
        switchMap((resp) => {
          this.usuario = resp.usuario;
          this.setUsuario.emit(this.usuario);
          return this.authService.getMessages();
        }),
        tap((resp) => {
          this.messages = resp;
        })
      );
    } else {
      return EMPTY; // Importar EMPTY de 'rxjs'
    }
  }

  ngOnDestroy(): void {
    
  }


  getId(message_id:number){
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigateByUrl('/auth');
      return;
    }
    this.authService.getMessage(token, message_id)
    .subscribe( message => {     
      this.authService.sendingMessage(message);    
      this.router.navigate(['/dashboard/message']);
    })
  }
  

}