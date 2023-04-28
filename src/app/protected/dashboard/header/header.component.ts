import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() usuario: Usuario | undefined;
  @Output() setUsuario = new EventEmitter<Usuario>();

  constructor( private authService: AuthService,
               private router: Router ){ }
  
  ngOnInit(): void {
    this.setUsuario.subscribe(( usuario: Usuario ) => {
      this.usuario = usuario;
    });
  }
  
  logout(): void {
    this.authService.logout();
  }

  goToDashboard(){
    const token = localStorage.getItem('token');
    if(token){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/auth']);
    }
  }

  goToAttendedMessages(){
    const token = localStorage.getItem('token');
    if(token){
      this.router.navigate(['/dashboard/attendedmessages']);
    }else{
      this.router.navigate(['/auth']);
    }
  }


}
