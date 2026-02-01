package com.helpdesk.backend.service;

import com.helpdesk.backend.model.*;
import com.helpdesk.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class TicketService {

    private final TicketRepository repo;

    public TicketService(TicketRepository repo) {
        this.repo = repo;
    }

    public Ticket create(Ticket ticket) {
        ticket.setStatus(Status.OPEN);
        ticket.setCreatedDate(LocalDateTime.now());
        return repo.save(ticket);
    }

    public List<Ticket> getAll() {
        return repo.findAll();
    }

    public Ticket getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket update(Long id, Ticket newTicket) {
        Ticket t = getById(id);
        t.setTitle(newTicket.getTitle());
        t.setDescription(newTicket.getDescription());
        t.setPriority(newTicket.getPriority());
        t.setStatus(newTicket.getStatus());
        return repo.save(t);
    }

    public Ticket close(Long id) {
        Ticket t = getById(id);
        t.setStatus(Status.CLOSED);
        return repo.save(t);
    }
    public void delete(Long id) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ticket not found"
                ));
        repo.delete(ticket);
    }


}
