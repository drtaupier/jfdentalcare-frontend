import { Component } from '@angular/core';
import { MenuItems } from 'src/app/auth/interfaces/interfaces';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  public reactiveMenu: MenuItems[] = [
    { title: 'Home', route: '/' },
    { title: 'About the doctor', route: '#bio' },
    { title: 'Our Service', route: '#service' },
    { title: 'Book an appointment', route: '#contact' },
    { title: 'Login', route: '/auth' }
  ]

}
