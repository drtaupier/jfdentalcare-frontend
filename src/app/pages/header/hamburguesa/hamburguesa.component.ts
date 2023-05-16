import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.component.html',
  styleUrls: ['./hamburguesa.component.scss']
})
export class HamburguesaComponent {

  showMenu() {    
    const menu = document.querySelector('.responsive-menu')!;
    const ocultar = document.querySelector('.hide-menu')!;
    if (ocultar){
      ocultar.classList.remove('hide-menu');
    }
    menu.classList.add('show-menu');
  }

  closeMenu(){
    const closeBtn = document.querySelector('.close-btn')!;
    const hamburguer = document.getElementById('hamburguer')!;
    const menu = document.querySelector('.responsive-menu')!;

    menu.classList.remove('show-menu');
    hamburguer.classList.remove('active');
    menu.classList.add('hide-menu')
  }

  
}
