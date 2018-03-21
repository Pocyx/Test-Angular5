import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel 

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './client.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    ClientService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
