/*
========================================
COMPONENT : TicketFormComponent
========================================

Ce composant gère :
- création d’un ticket (CREATE)
- modification d’un ticket (UPDATE)

C’est le formulaire principal de l’application.

Il communique avec :
→ TicketService (HTTP API)
→ TicketListComponent (rafraîchir la liste)
*/

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';



@Component({
  selector: 'app-ticket-form',

  /*
  standalone: true
  ➜ composant autonome (Angular moderne)
  ➜ pas besoin de module
  */
  standalone: true,

  /*
  Modules utilisés :
  - FormsModule → ngModel (formulaire)
  - CommonModule → *ngIf, *ngFor
  */
  imports: [FormsModule, CommonModule],

  templateUrl: './ticket-form.html'
})
export class TicketFormComponent {



  /*
  ========================================
  Communication avec parent
  ========================================

  @Output
  permet d’envoyer un événement au composant parent.

  saved.emit() = "hey parent, j’ai fini create/update"
  */
  @Output() saved = new EventEmitter<void>();



  /*
  Objet ticket lié au formulaire
  stocke les valeurs saisies par l'utilisateur
  */
  ticket: Ticket = this.emptyTicket();



  // indique si on est en mode édition ou création
  isEdit = false;



  /*
  Injection du service pour appeler l’API
  */
  constructor(private service: TicketService) {}



  /*
  ========================================
  Créer un ticket vide
  ========================================
  utilisé pour reset le formulaire
  */
  emptyTicket(): Ticket {
    return {
      title: '',
      description: '',
      priority: 'LOW',
      status: 'OPEN'
    };
  }



  /*
  ========================================
  CREATE ou UPDATE
  ========================================
  appelée quand on clique sur "Submit"
  */
  submit() {

    // si on est en mode édition
    if (this.isEdit && this.ticket.id) {

      // ===== UPDATE =====
      this.service.update(this.ticket.id, this.ticket).subscribe(() => {

        alert('Ticket modifié');

        // informe le parent de recharger la liste
        this.saved.emit();

        // reset formulaire
        this.reset();
      });

    } else {

      // ===== CREATE =====
      this.service.create(this.ticket).subscribe(() => {

        alert('Ticket créé');

        // recharge la liste
        this.saved.emit();

        this.reset();
      });
    }
  }



  /*
  ========================================
  Remplir formulaire pour édition
  ========================================
  appelée par TicketListComponent
  quand on clique sur "Modifier"
  */
  edit(ticket: Ticket) {

    // copie de l’objet pour éviter modifier original
    this.ticket = { ...ticket };

    this.isEdit = true;
  }



  /*
  ========================================
  Reset formulaire
  ========================================
  vide le formulaire après action
  */
  reset() {
    this.ticket = this.emptyTicket();
    this.isEdit = false;
  }

}
