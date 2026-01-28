package com.helpdesk.backend.controller;

import com.helpdesk.backend.model.Ticket;
import com.helpdesk.backend.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @PostMapping
    public Ticket create(@RequestBody Ticket ticket) {
        return service.create(ticket);
    }

    @GetMapping
    public List<Ticket> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody Ticket ticket) {
        return service.update(id, ticket);
    }

    //Tickets OPEN
    @GetMapping("/open")
    public List<Ticket> getOpenTickets() {
        return service.getOpenTickets();
    }

    //Affecter ticket à agent
    @PutMapping("/{ticketId}/assign/{agentId}")
    public Ticket assignTicket(
            @PathVariable Long ticketId,
            @PathVariable Long agentId) {
        return service.assignAgent(ticketId, agentId);
    }
}
