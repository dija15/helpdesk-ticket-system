import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ticket-form',
  standalone: true,
   imports: [FormsModule, CommonModule],
  templateUrl: './ticket-form.html'
})
export class TicketFormComponent {

  ticket: Ticket = this.emptyTicket();
  isEdit = false;

  constructor(private service: TicketService) {}

  emptyTicket(): Ticket {
    return {
      title: '',
      description: '',
      priority: 'LOW',
      status: 'OPEN'
    };
  }

  submit() {
    if (this.isEdit && this.ticket.id) {
      this.service.update(this.ticket.id, this.ticket).subscribe(() => {
        alert('Ticket modifié');
        this.reset();
      });
    } else {
      this.service.create(this.ticket).subscribe(() => {
        alert('Ticket créé');
        this.reset();
      });
    }
  }

  edit(ticket: Ticket) {
    this.ticket = { ...ticket };
    this.isEdit = true;
  }

  reset() {
    this.ticket = this.emptyTicket();
    this.isEdit = false;
  }
}
