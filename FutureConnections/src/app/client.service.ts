/*import { Injectable } from '@angular/core';
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

}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Client } from './client';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 

@Injectable()
export class ClientService {
 
  private clientsUrl = 'api/clients';  // URL to web api
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  /** GET Clients from the server */
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe(
        tap(clients => this.log(`fetched clients`)),
        catchError(this.handleError('getClients', []))
      );
  }
 
  /** GET Client by id. Return `undefined` when id not found */
  getClientNo404<Data>(id: number): Observable<Client> {
    const url = `${this.clientsUrl}/?id=${id}`;
    return this.http.get<Client[]>(url)
      .pipe(
        map(clients => clients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Client id=${id}`);
        }),
        catchError(this.handleError<Client>(`getClient id=${id}`))
      );
  }
 
  /** GET Client by id. Will 404 if id not found */
  getClient(id: number): Observable<Client> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client id=${id}`)),
      catchError(this.handleError<Client>(`getClient id=${id}`))
    );
  }
 
  /* GET Clients whose name contains search term */
  searchClients(term: string): Observable<Client[]> {
    if (!term.trim()) {
      // if not search term, return empty Client array.
      return of([]);
    }
    return this.http.get<Client[]>(`api/clients/?name=${term}`).pipe(
      tap(_ => this.log(`found clients matching "${term}"`)),
      catchError(this.handleError<Client[]>('searchClients', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new client to the server */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsUrl, client, httpOptions).pipe(
      tap((client: Client) => this.log(`added client w/ id=${client.id}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }
 
  /** DELETE: delete the client from the server */
  deleteClient (client: Client | number): Observable<Client> {
    const id = typeof client === 'number' ? client : client.id;
    const url = `${this.clientsUrl}/${id}`;
 
    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted client id=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }
 
  /** PUT: update the Client on the server */
  updateClient (client: Client): Observable<any> {
    return this.http.put(this.clientsUrl, client, httpOptions).pipe(
      tap(_ => this.log(`updated client id=${client.id}`)),
      catchError(this.handleError<any>('updateClient'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ClientService: ' + message);
  }
}



