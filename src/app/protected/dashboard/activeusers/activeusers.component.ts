import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.scss']
})
export class ActiveusersComponent implements OnInit {

  usuario!: Usuario;
  usuarios: Usuario[] = [];

  constructor( private authService: AuthService, 
                private router: Router ){

  }

  ngOnInit(): void {
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigateByUrl('/auth');
      }

      this.getUser();
  }

  getUser() : void {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwt_decode(token);
      const user_id = decodedToken.user_id;
      this.authService.getUserData(token, user_id)
      .subscribe( (resp) => {
        this.usuario = resp.usuario;
      });
      this.authService.getActiveUsers().subscribe((resp)=>{
        this.usuarios = resp;
      })
    }
  }



}
