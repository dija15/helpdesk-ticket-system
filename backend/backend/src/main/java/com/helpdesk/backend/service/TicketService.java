package com.helpdesk.backend.service;

import com.helpdesk.backend.model.*;
import com.helpdesk.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


/*
 * ===================================
 * SERVICE : TicketService
 * ===================================
 * Cette classe contient la logique métier.
 * Elle fait le lien entre :
 *
 * Controller  →  Service  →  Repository  →  Database
 *
 * Ici on met les règles business (statut par défaut, fermeture, etc.)
 */

@Service // ➜ Indique que c’est un composant métier Spring
public class TicketService {

    /*
     * Injection du Repository
     * Permet d'accéder à la base de données
     */
    private final TicketRepository repo;

    // ➜ Injection via constructeur (bonne pratique Spring)
    public TicketService(TicketRepository repo) {
        this.repo = repo;
    }



    /*
     * ===================================
     * CREATE
     * ===================================
     * Créer un nouveau ticket
     */
    public Ticket create(Ticket ticket) {

        // règle métier : statut par défaut
        ticket.setStatus(Status.OPEN);

        // règle métier : date automatique
        ticket.setCreatedDate(LocalDateTime.now());

        // sauvegarde en base
        return repo.save(ticket);
    }



    /*
     * ===================================
     * READ ALL
     * ===================================
     * Récupérer tous les tickets
     */
    public List<Ticket> getAll() {

        // SELECT * FROM tickets
        return repo.findAll();
    }



    /*
     * ===================================
     * READ BY ID
     * ===================================
     * Récupérer un ticket spécifique
     */
    public Ticket getById(Long id) {

        return repo.findById(id)
                // si pas trouvé → erreur
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));
    }



    /*
     * ===================================
     * UPDATE
     * ===================================
     * Modifier un ticket existant
     */
    public Ticket update(Long id, Ticket newTicket) {

        // on récupère l'ancien ticket
        Ticket t = getById(id);

        // mise à jour des champs
        t.setTitle(newTicket.getTitle());
        t.setDescription(newTicket.getDescription());
        t.setPriority(newTicket.getPriority());
        t.setStatus(newTicket.getStatus());

        // sauvegarde (UPDATE SQL)
        return repo.save(t);
    }



    /*
     * ===================================
     * CLOSE
     * ===================================
     * Fermer un ticket
     */
    public Ticket close(Long id) {

        Ticket t = getById(id);

        // règle métier : on change seulement le statut
        t.setStatus(Status.CLOSED);

        return repo.save(t);
    }



    /*
     * ===================================
     * DELETE
     * ===================================
     * Supprimer un ticket
     */
    public void delete(Long id) {

        Ticket ticket = repo.findById(id)
                .orElseThrow(() ->
                        // retourne HTTP 404 si introuvable
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Ticket not found"
                        ));

        // DELETE FROM tickets WHERE id = ?
        repo.delete(ticket);
    }
}
