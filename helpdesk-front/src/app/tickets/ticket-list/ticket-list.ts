import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.html'
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = [];

  @Output() editTicket = new EventEmitter<Ticket>();

  constructor(private service: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.service.getAll().subscribe(data => {
      this.tickets = data;
    });
  }

  closeTicket(id: number): void {
    this.service.close(id).subscribe(() => {
      this.loadTickets();
    });
  }

  edit(ticket: Ticket): void {
    this.editTicket.emit(ticket);
  }

  deleteTicket(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer ce ticket ?')) {
    this.service.delete(id).subscribe({
      next: () => this.loadTickets(),
      error: () => alert('Ticket déjà supprimé ou introuvable')
    });
  }
}}