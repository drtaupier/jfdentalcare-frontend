
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map, switchMap, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Message, MessageStatus, Usuario } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private baseUrl: string = environment.baseUrl;
  messageUpdated$ = new Subject<void>();
  
  messages: Message[] = [];
  messageUser: MessageStatus[] = [];

  constructor( private http: HttpClient,
               private router: Router) { }
  

                 
  login(credentials: { username: string, password: string } ): Observable<{ token: string, user_id: number }> {
    return this.http.post<{ token: string, user_id: number }>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap( resp => {     
          const token = String(resp.token)
          if(resp.token){
            localStorage.setItem('token', token);
          }
        }),
        switchMap(resp => {
          const token = String(resp.token);
          const user_id = resp.user_id;
          return this.getUserData(token, user_id).pipe(
            map(resp2 => ({ token: token, user_id: user_id, usuario: resp2.usuario }))
          );
        })
      );
    }

  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }


  //Users:

  private userSource = new BehaviorSubject<Usuario | null>(null);
  user$ = this.userSource.asObservable();

  sendigUser(user:Usuario){
    this.userSource.next(user)
  }

  getUserData(token: string, user_id: number): Observable<{ token: string, usuario: Usuario }> {
      return this.http.get<Usuario>(`${this.baseUrl}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map(usuario => {
          return { token, usuario };
        })
      );
    }

    validarToken(): Observable<boolean> {
      const token = localStorage.getItem('token');
      if (token) {
        return this.http.get<boolean>(`${this.baseUrl}/users`, { headers: { Authorization: `Bearer ${token}` }});
      } else {
        return of(false);
      }
    }

    //Crea usuarios:
    createUser(firstname: string, lastname: string, username: string, password: string, dob:Date, role_id:number){
      const url = `${this.baseUrl}/user/register`;
      const body = { firstname, lastname, username, password, dob, role_id }

      return this.http.post(url, body);
    }


    getActiveUsers():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(`${this.baseUrl}/user/active`);
    }


    
    //Messages:
    private messageSource = new BehaviorSubject<Message | null>(null);
    message$ = this.messageSource.asObservable();
    
    sendingMessage(message:Message){
      this.messageSource.next(message)
    }

    sendMessage(firstname: string, lastname: string, phone: string, email: string, possible_appt: number, message: string){
      const url = `${this.baseUrl}/message/sendingmessage`;
      const body = { firstname, lastname, phone, email, possible_appt, message }
      
      return this.http.post(url, body);
    }

    //Trae un mensaje específico
    getMessage(token: string, message_id: number): Observable<Message> {
      return this.http.get<Message>(`${this.baseUrl}/messages/${message_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    

    //Trae todos los mensajes al dashboard
    getMessages():Observable< Message[] >{
      const token = localStorage.getItem('token');
      return this.http.get<Message[]>(`${this.baseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
        
    
    //Message_users:
    private messageUserSource = new BehaviorSubject<MessageStatus | null>(null);
    messageUser$ = this.messageUserSource.asObservable();

    sendingMessageUser(message:MessageStatus){
      this.messageUserSource.next(message)
    }

    //Crea la relación entre message users:
    createMessageUsers(token:string, message_id:number, status_id:number, user_id:number):Observable<MessageStatus>{
      const url = `${this.baseUrl}/message-users/${message_id}/${status_id}/${user_id}`;
      const body = { message_id, status_id, user_id };
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post<MessageStatus>(url, body, { headers }); // Actualización aquí
    }

    updateMessageStatus(token: string, user_id: number, message_users_id: number, status_id: number): Observable<MessageStatus> {
      const url = `${this.baseUrl}/message-users/edit`;
    
      const body: { message_users_id: number; status_id: number; user_id: number } = {
        message_users_id,
        status_id,
        user_id,
      };
    
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    
      return this.http.put<MessageStatus>(url, body, { headers });
    }
    
    getMessageUserFromMessage(message_id:number):Observable<MessageStatus>{
      return this.http.get<MessageStatus>(`${this.baseUrl}/message-user-Message/${message_id}`);
    }

    //Me trae un mensaje nuevo específico:
    getNewMessageUsersByID(token: string, message_users_id: number):Observable<MessageStatus>{
      const headers = new HttpHeaders().set('Authorization', 'Bearer' + token )
      return this.http.get<MessageStatus>(`${this.baseUrl}/messageuser-newMessage/${message_users_id}`);
    }

     //Me trae mensajes atendidos:
     getMessageUserAttended():Observable<MessageStatus[]>{
      return this.http.get<MessageStatus[]>(`${this.baseUrl}/message-users/showattended`);
    }
    
    backToActiveAgain(token:string, user_id:number, message_id:number):Observable<MessageStatus>{
      const url = `${this.baseUrl}/message-users/${message_id}/6/${user_id}`
      const body = { status: 1 };
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.post<MessageStatus>(url, body, { headers });
    }

  }

