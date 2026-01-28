package com.helpdesk.backend.service;

import com.helpdesk.backend.model.Agent;
import com.helpdesk.backend.model.Status;
import com.helpdesk.backend.model.Ticket;
import com.helpdesk.backend.repository.AgentRepository;
import com.helpdesk.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;
    private final AgentRepository agentRepository;

    public TicketService(TicketRepository repository, AgentRepository agentRepository) {
        this.repository = repository;
        this.agentRepository = agentRepository;
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

    public List<Ticket> getOpenTickets() {
        return repository.findByStatus(Status.OPEN);
    }

    public Ticket assignAgent(Long ticketId, Long agentId) {
        Ticket ticket = repository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        ticket.setAgent(agent);
        ticket.setStatus(Status.IN_PROGRESS);

        return repository.save(ticket);
    }
}
