import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Input() usuario: Usuario | undefined;

  constructor( private authService: AuthService ){}
  
  logout(): void {
    this.authService.logout();
  }

}
