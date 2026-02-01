package com.helpdesk.backend.controller;

import com.helpdesk.backend.model.Ticket;
import com.helpdesk.backend.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin("*")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Ticket create(@RequestBody Ticket ticket) {
        return service.create(ticket);
    }

    // GET ALL
    @GetMapping
    public List<Ticket> getAll() {
        return service.getAll();
    }

    // GET BY ID (pour edit)
    @GetMapping("/{id}")
    public Ticket getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody Ticket ticket) {
        return service.update(id, ticket);
    }

    // CLOSE (bouton fermer)
    @PutMapping("/{id}/close")
    public Ticket close(@PathVariable Long id) {
        return service.close(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
