/*
========================================
COMPONENT : TicketListComponent
========================================

Ce composant gère :
- affichage de la liste des tickets
- fermeture d’un ticket
- suppression d’un ticket
- envoi d’un ticket au formulaire pour édition

C’est la partie "READ + DELETE + CLOSE" du CRUD.

Architecture :
List → Service → Backend API
*/

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';



@Component({
  selector: 'app-ticket-list',

  // composant standalone (Angular moderne)
  standalone: true,

  // nécessaire pour *ngFor, *ngIf
  imports: [CommonModule],

  templateUrl: './ticket-list.html'
})
export class TicketListComponent implements OnInit {



  /*
  ========================================
  Liste des tickets
  ========================================
  stocke les tickets récupérés depuis l’API
  affichés dans le tableau HTML
  */
  tickets: Ticket[] = [];



  /*
  ========================================
  Communication vers parent
  ========================================
  Permet d’envoyer le ticket sélectionné
  vers TicketFormComponent pour édition
  */
  @Output() editTicket = new EventEmitter<Ticket>();



  /*
  Injection du service HTTP
  */
  constructor(private service: TicketService) {}



  /*
  ========================================
  ngOnInit()
  ========================================
  appelée automatiquement au démarrage du composant

  on charge les tickets au début
  */
  ngOnInit(): void {
    this.loadTickets();
  }



  /*
  ========================================
  Charger tous les tickets
  ========================================
  GET /api/tickets
  */
  loadTickets(): void {

    this.service.getAll().subscribe(data => {

      // on met à jour la liste affichée
      this.tickets = data;
    });
  }



  /*
  ========================================
  Fermer un ticket
  ========================================
  PUT /api/tickets/{id}/close
  */
  closeTicket(id: number): void {

    this.service.close(id).subscribe(() => {

      // recharge la liste après modification
      this.loadTickets();
    });
  }



  /*
  ========================================
  Modifier ticket
  ========================================
  envoie ticket au parent (TicketForm)
  */
  edit(ticket: Ticket): void {

    // communication enfant → parent
    this.editTicket.emit(ticket);
  }



  /*
  ========================================
  Supprimer ticket
  ========================================
  DELETE /api/tickets/{id}
  */
  deleteTicket(id: number): void {

    // confirmation utilisateur
    if (confirm('Voulez-vous vraiment supprimer ce ticket ?')) {

      this.service.delete(id).subscribe({

        // succès → recharge liste
        next: () => this.loadTickets(),

        // erreur → message
        error: () => alert('Ticket déjà supprimé ou introuvable')
      });
    }
  }

}
