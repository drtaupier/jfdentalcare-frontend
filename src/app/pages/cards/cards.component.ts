import { Component } from '@angular/core';
import { CardItems } from 'src/app/auth/interfaces/interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  cardsItems: CardItems[] = [
    {
      img: 'assets/images/img4.png',
      icono: 'pi pi-check',
      title: 'Dental Emergencies',
      text: 'Prompt care for tooth pain, broken teeth, swelling, and other urgent dental concerns. Contact our team so we can help you find relief.',
    },
    {
      img: 'assets/images/img3.png',
      icono: 'pi pi-check',
      title: 'Invisalign',
      text: 'A discreet and comfortable way to straighten your smile using clear, removable aligners designed around your treatment needs.',
    },
    {
      img: 'assets/images/prueba.jpg',
      icono: 'pi pi-check',
      title: 'Oral Surgery',
      text: 'Thoughtful surgical dental care focused on your comfort, safety, and recovery, with clear guidance throughout every step.',
    },
  ];
}
