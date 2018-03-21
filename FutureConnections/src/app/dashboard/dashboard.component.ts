import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void{
    this.clientService.getClients()
    .subscribe(clients => this.clients = clients.slice(1,5));
  }

}
