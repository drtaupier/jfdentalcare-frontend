import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizarParrafoPipe } from '../pipes/capitalizar-parrafo.pipe';

import { PhonePipe } from "../pipes/phone.pipe";
import { ActiveusersComponent } from './dashboard/activeusers/activeusers.component';
import { AtendidosComponent } from './dashboard/atendidos/atendidos.component';
import { CreateUsersComponent } from './dashboard/create-users/create-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { EditMessageStatusComponent } from './dashboard/edit-message-status/edit-message-status.component';


@NgModule({
  declarations: [
    CapitalizarParrafoPipe,
    DashboardComponent,
    MessagesComponent,
    PhonePipe,
    HeaderComponent,
    FooterComponent,
    CreateUsersComponent,
    AtendidosComponent,
    ActiveusersComponent,
    EditMessageStatusComponent
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
