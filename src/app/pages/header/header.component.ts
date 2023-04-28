import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sticky = false;

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.sticky = scrollPosition >= 10;

    // agrega la clase "sticky-header" al body si el header es pegajoso, quita la clase en caso contrario
    if (this.sticky) {
      document.body.classList.add('navbar-sticky');
    } else {
      document.body.classList.remove('navbar-sticky');
    }
  }
}


