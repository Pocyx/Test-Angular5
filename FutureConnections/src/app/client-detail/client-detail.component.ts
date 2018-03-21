import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  @Input() client: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getClient();
  }
 
  getClient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(id)
      .subscribe(client => this.client = client);
  }
 
  goBack(): void {
    this.location.back();
  }
}
