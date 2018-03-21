import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
 
import { Client } from './client';
import { CLIENTS } from './mock-clients';
import { MessageService } from './message.service';

@Injectable()
export class ClientService {

  constructor(private messageService: MessageService) { }

  getClients(): Observable<Client[]> {
    this.messageService.add('ClientService: fetched clients');
    return of(CLIENTS);
  }

  getClient(id: number): Observable<Client> {
    this.messageService.add(`ClientService: fetched client id=${id}`);
    return of(CLIENTS.find(client => client.id === id));
  }

}
