/*
========================================
ROOT COMPONENT : AppComponent
========================================

C’est le composant principal de l’application.

Il sert à :
- afficher la structure globale de la page
- assembler les composants enfants
- gérer la communication entre eux

Architecture :
AppComponent
   ├── TicketFormComponent
   └── TicketListComponent
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { TicketListComponent } from './tickets/ticket-list/ticket-list';



@Component({
  selector: 'app-root',

  /*
  standalone: true
  ➜ Angular moderne (pas besoin de AppModule)
  ➜ composant autonome
  */
  standalone: true,


  /*
  Modules + composants utilisés dans le template
  DOIT importer :
  - CommonModule → directives Angular (*ngIf, *ngFor)
  - TicketFormComponent
  - TicketListComponent
  */
  imports: [CommonModule, TicketFormComponent, TicketListComponent],


  /*
  Template principal de la page
  contient le layout global
  */
  template: `
    <div class="container mt-4">

      <!-- Titre principal -->
      <h1 class="mb-4">Helpdesk - Gestion des tickets</h1>


      <!--
      Formulaire de création/modification
      #form = référence locale
      permet d’appeler form.edit()
      -->
      <app-ticket-form #form></app-ticket-form>


      <!--
      Liste des tickets

      (editTicket) = événement émis par TicketListComponent

      Quand on clique "Modifier" :
      → TicketList émet ticket
      → on appelle form.edit(ticket)
      → le formulaire se remplit automatiquement
      -->
      <app-ticket-list
        (editTicket)="form.edit($event)">
      </app-ticket-list>

    </div>
  `
})
export class AppComponent {}
