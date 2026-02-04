import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { TicketListComponent } from './tickets/ticket-list/ticket-list';

@Component({
  selector: 'app-root',
  standalone: true,

  // 🔥 AJOUTE CommonModule ICI
  imports: [CommonModule, TicketFormComponent, TicketListComponent],

  template: `
    <div class="container mt-4">
      <h1 class="mb-4">Helpdesk - Gestion des tickets</h1>

      <app-ticket-form #form></app-ticket-form>

      <app-ticket-list
        (editTicket)="form.edit($event)">
      </app-ticket-list>
    </div>
  `
})
export class AppComponent {}
