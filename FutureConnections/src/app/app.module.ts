import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel 

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
