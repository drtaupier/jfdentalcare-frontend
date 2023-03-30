import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { PhonePipe } from "../pipes/phone.pipe";


@NgModule({
  declarations: [
    DashboardComponent,
    MessagesComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
  ],
  exports: [
    PhonePipe
  ]
})
export class ProtectedModule { }
