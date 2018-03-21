import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { CLIENTS } from '../mock-clients';
import { checkAndUpdateDirectiveInline } from '@angular/core/src/view/provider';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  /*clients = CLIENTS;*/

  selectedClient: Client;

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
  }

}
