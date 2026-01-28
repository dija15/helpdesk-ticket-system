package com.helpdesk.backend.service;

import com.helpdesk.backend.model.Agent;
import com.helpdesk.backend.repository.AgentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    private final AgentRepository repository;

    public AgentService(AgentRepository repository) {
        this.repository = repository;
    }

    public List<Agent> getAll() {
        return repository.findAll();
    }
}

