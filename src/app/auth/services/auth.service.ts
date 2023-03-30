import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from "rxjs";
import { map, switchMap, tap, catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment';
import { Usuario, Message, MessageStatus } from '../interfaces/interfaces';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private baseUrl: string = environment.baseUrl;
  
  messages: Message[] = [];

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

    logout(){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/auth');
    }

    getMessages():Observable< Message[] >{
      const token = localStorage.getItem('token');
      return this.http.get<Message[]>(`${this.baseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
    
    getMessage(message_id: number): Observable<Message> {
      const token = localStorage.getItem('token');
      if (token) {
        return this.http.get<Message>(`${this.baseUrl}/messages/${message_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).pipe(
          catchError(error => {
            console.log(error);
            return throwError("Error al obtener un mensaje");
          })
        );
      } else {
        return throwError('No se encontró token')
        
      }
    }

    updateMessageStatus(token:string, user_id:number, message_id:number):Observable<MessageStatus>{
      const url = `${this.baseUrl}/message-users/${message_id}/6/${user_id}`
      const body = { status: 6 };
      const headers = {
        Authorization: `Bearer ${token}`
      };
      return this.http.post<MessageStatus>(url, body, { headers });
    }
    
    getMessageUser(){
      const url = `${this.baseUrl}/message-users/showattended`
    }

    getMensajes(){
      this.http.get<Message[]>(`${this.baseUrl}/messages/`)
    }

  }

