import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveusersComponent } from './dashboard/activeusers/activeusers.component';
import { AtendidosComponent } from './dashboard/atendidos/atendidos.component';
import { CreateUsersComponent } from './dashboard/create-users/create-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMessageStatusComponent } from './dashboard/edit-message-status/edit-message-status.component';
import { MessagesComponent } from './dashboard/messages/messages.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: '', component: DashboardComponent},
      {path: 'message', component: MessagesComponent},
      {path: 'createuser', component: CreateUsersComponent },
      {path: 'attendedmessages', component: AtendidosComponent},
      {path: 'activeusers', component: ActiveusersComponent},
      {path: 'editmessagestatus', component: EditMessageStatusComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
