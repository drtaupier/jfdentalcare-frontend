import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhonePipe } from "../pipes/phone.pipe";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { FooterComponent } from './dashboard/footer/footer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MessagesComponent,
    PhonePipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PhonePipe
  ]
})
export class ProtectedModule { }
