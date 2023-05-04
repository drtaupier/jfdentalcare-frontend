import { Component } from '@angular/core';
import { CardItems } from 'src/app/auth/interfaces/interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  cardsItems: CardItems[] = [
    {
      img: '../../../assets/images/img4.png',
      icono: 'pi pi-check',
      title: 'Dental Emergencies',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      img: '../../../assets/images/img3.png',
      icono: 'pi pi-check',
      title: 'Invisalign',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      img: '../../../assets/images/prueba.jpg',
      icono: 'pi pi-check',
      title: 'Oral Surgery',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
  ]
    
  
}
