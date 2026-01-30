package com.helpdesk.backend.controller;

import com.helpdesk.backend.model.Agent;
import com.helpdesk.backend.service.AgentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/agents")

public class AgentController {

    private final AgentService service;

    public AgentController(AgentService service) {
        this.service = service;
    }

    // Liste des agents
    @GetMapping
    public List<Agent> getAllAgents() {
        return service.getAll();
    }
}

