/*
======================================
MODEL : Ticket (Frontend)
======================================

Cette interface représente la structure d’un ticket côté Angular.

⚠️ Important :
Elle doit correspondre EXACTEMENT au modèle Ticket.java du backend,
sinon l’API REST ne fonctionnera pas correctement.

Elle sert pour :
- typer les données
- éviter les erreurs
- avoir l’auto-complétion TypeScript
*/

export interface Ticket {

  // ➜ ID optionnel
  // Pourquoi optionnel (?)
  // Car lors de la création (POST) l'id n'existe pas encore
  // Il sera généré automatiquement par le backend
  id?: number;


  // ➜ titre du ticket
  // Exemple : "Problème wifi"
  title: string;


  // ➜ description détaillée
  description: string;


  /*
   ➜ statut du ticket
   On utilise des valeurs fixes (Union Type)
   pour éviter les erreurs d'écriture.

   Comme un Enum Java.

   Seulement ces valeurs sont autorisées :
   - OPEN
   - IN_PROGRESS
   - RESOLVED
   - CLOSED
  */
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';



  /*
   ➜ priorité du ticket
   Même principe que status

   Seulement :
   - LOW
   - MEDIUM
   - HIGH
  */
  priority: 'LOW' | 'MEDIUM' | 'HIGH';



  // ➜ date de création
  // string car envoyée en JSON depuis le backend
  // ex : "2026-02-01T14:22:33"
  // optionnelle car créée automatiquement côté backend
  createdDate?: string;
}
