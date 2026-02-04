/*
========================================
SERVICE : TicketService (Frontend)
========================================

Ce service permet à Angular de communiquer
avec le backend Spring Boot via HTTP (API REST).

Il centralise toutes les requêtes API :
- GET
- POST
- PUT
- DELETE

Architecture :
Component → Service → Backend API
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';



/*
@Injectable
➜ indique que cette classe peut être injectée
   dans d'autres composants (Dependency Injection)

providedIn: 'root'
➜ service global singleton (une seule instance)
   accessible dans toute l’application
*/
@Injectable({ providedIn: 'root' })
export class TicketService {


  /*
  URL de base de l'API backend
  correspond à :
  @RequestMapping("/api/tickets")

  Backend tourne sur :
  localhost:8082
  */
  private apiUrl = 'http://localhost:8082/api/tickets';



  /*
  Injection de HttpClient
  ➜ permet d'envoyer des requêtes HTTP (GET, POST, etc.)
  */
  constructor(private http: HttpClient) {}



  /*
  ========================================
  GET ALL
  ========================================
  Récupérer tous les tickets

  GET /api/tickets
  */
  getAll(): Observable<Ticket[]> {

    // retourne un Observable (asynchrone)
    // Angular va s'abonner avec .subscribe()
    return this.http.get<Ticket[]>(this.apiUrl);
  }



  /*
  ========================================
  CREATE
  ========================================
  Créer un nouveau ticket

  POST /api/tickets
  */
  create(ticket: Ticket): Observable<Ticket> {

    // envoie ticket dans le body
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }



  /*
  ========================================
  UPDATE
  ========================================
  Modifier un ticket

  PUT /api/tickets/{id}
  */
  update(id: number, ticket: Ticket): Observable<Ticket> {

    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
  }



  /*
  ========================================
  CLOSE
  ========================================
  Fermer un ticket

  PUT /api/tickets/{id}/close
  */
  close(id: number): Observable<Ticket> {

    // body vide {}
    return this.http.put<Ticket>(`${this.apiUrl}/${id}/close`, {});
  }



  /*
  ========================================
  DELETE
  ========================================
  Supprimer un ticket

  DELETE /api/tickets/{id}
  */
  delete(id: number) {

    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
