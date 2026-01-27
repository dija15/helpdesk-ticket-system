package com.helpdesk.backend.service;

import com.helpdesk.backend.model.Ticket;
import com.helpdesk.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public Ticket create(Ticket ticket) {
        return repository.save(ticket);
    }

    public List<Ticket> getAll() {
        return repository.findAll();
    }

    public Ticket update(Long id, Ticket ticket) {
        ticket.setId(id);
        return repository.save(ticket);
    }
}
