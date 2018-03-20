import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { CLIENTS } from '../mock-clients';
import { checkAndUpdateDirectiveInline } from '@angular/core/src/view/provider';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients = CLIENTS;

  selectedClient: Client;

  constructor() { }

  ngOnInit() {
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
  }

}
