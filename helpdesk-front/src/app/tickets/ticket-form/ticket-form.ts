import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-form.html'
})
export class TicketFormComponent {

  // 🔥 informe le parent quand create/update fini
  @Output() saved = new EventEmitter<void>();

  ticket: Ticket = this.emptyTicket();
  isEdit = false;

  constructor(private service: TicketService) {}

  // -----------------------------
  // Ticket vide (reset)
  // -----------------------------
  emptyTicket(): Ticket {
    return {
      title: '',
      description: '',
      priority: 'LOW',
      status: 'OPEN'
    };
  }

  // -----------------------------
  // CREATE ou UPDATE
  // -----------------------------
  submit() {
    if (this.isEdit && this.ticket.id) {

      // ✅ UPDATE
      this.service.update(this.ticket.id, this.ticket).subscribe(() => {
        alert('Ticket modifié');
        this.saved.emit();   // 🔥 recharge la liste
        this.reset();
      });

    } else {

      // ✅ CREATE
      this.service.create(this.ticket).subscribe(() => {
        alert('Ticket créé');
        this.saved.emit();   // 🔥 recharge la liste
        this.reset();
      });
    }
  }

  // -----------------------------
  // Remplir formulaire pour edit
  // -----------------------------
  edit(ticket: Ticket) {
    this.ticket = { ...ticket };
    this.isEdit = true;
  }

  // -----------------------------
  // Reset formulaire
  // -----------------------------
  reset() {
    this.ticket = this.emptyTicket();
    this.isEdit = false;
  }
}
