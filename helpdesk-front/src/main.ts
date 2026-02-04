/*
========================================
main.ts  (Entry Point Angular)
========================================

C’est le point de démarrage de l’application Angular.

Rôle :
- lancer Angular
- charger le composant racine (AppComponent)
- configurer les providers globaux (ex: HTTP)

Sans ce fichier → l’application ne démarre pas.
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app';



/*
========================================
bootstrapApplication()
========================================

Cette fonction démarre l’application Angular.

Elle :
1️⃣ charge AppComponent
2️⃣ crée le DOM Angular
3️⃣ initialise tous les services
4️⃣ affiche l’interface dans index.html
*/
bootstrapApplication(AppComponent, {


  /*
  providers = services globaux disponibles partout

  provideHttpClient()
  ➜ active HttpClient dans toute l’application
  ➜ nécessaire pour faire les requêtes HTTP (API REST)

  Sans ça :
  ❌ injection HttpClient impossible
  ❌ TicketService ne marche pas
  */
  providers: [provideHttpClient()]

});
