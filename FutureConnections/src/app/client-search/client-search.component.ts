import { Component, OnInit } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Client } from '../client';
import { ClientService } from '../client.service';
 
@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: [ './client-search.component.css' ]
})
export class ClientSearchComponent implements OnInit {
  clients$: Observable<Client[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private clientService: ClientService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.clients$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.clientService.searchClients(term)),
    );
  }
}