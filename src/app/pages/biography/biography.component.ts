import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent {

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const imgBio = document.querySelector('.img-bio');
    if (imgBio) {
      if (scrollPosition >= 120.5) {
        imgBio.classList.add('animated');
      } else {
        imgBio.classList.remove('animated');
      }
    }
  }
  
}
