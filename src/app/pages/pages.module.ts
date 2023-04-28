import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BiographyComponent } from './biography/biography.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';
import { LocationComponent } from './location/location.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    CarouselComponent,
    CardsComponent,
    BiographyComponent,
    IntroComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]

})
export class PagesModule { }
