import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PhonePipe
  ]
})
export class ProtectedModule { }
