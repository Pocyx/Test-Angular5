import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel 

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './client.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { HttpClientModule }    from '@angular/common/http';
import { ClientSearchComponent } from './client-search/client-search.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ClientSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    ClientService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
