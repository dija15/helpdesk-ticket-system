package com.helpdesk.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * ==============================
 * ENTITY : Ticket
 * ==============================
 * Cette classe représente la table "tickets" dans la base de données.
 * Chaque objet Ticket correspond à une ligne dans la table.
 */

@Entity // ➜ Indique à JPA/Hibernate que cette classe = table SQL
@Table(name = "tickets") // ➜ Nom exact de la table dans MySQL
public class Ticket {

    /*
     * ==============================
     * PRIMARY KEY
     * ==============================
     */

    @Id // ➜ Clé primaire
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ➜ Auto-increment (1,2,3,4...)
    private Long id;



    /*
     * ==============================
     * COLONNES SIMPLES
     * ==============================
     */

    // ➜ Titre du ticket (ex: "Problème wifi")
    private String title;

    @Column(length = 1000)
    // ➜ Description plus longue (1000 caractères au lieu de 255)
    private String description;



    /*
     * ==============================
     * ENUMS
     * ==============================
     */

    @Enumerated(EnumType.STRING)
    // ➜ Sauvegarde en DB comme texte (OPEN, CLOSED...)
    // ➜ plus lisible que 0,1,2
    private Status status;

    @Enumerated(EnumType.STRING)
    // ➜ priorité (LOW, MEDIUM, HIGH)
    private Priority priority;



    /*
     * ==============================
     * DATE
     * ==============================
     */

    // ➜ Date de création du ticket
    private LocalDateTime createdDate;



    /*
     * ==============================
     * RELATIONS
     * ==============================
     */

    @ManyToOne
    // ➜ Plusieurs tickets peuvent appartenir à 1 seul user
    @JoinColumn(name = "user_id")
    // ➜ clé étrangère dans la table tickets
    private User user;   // créateur du ticket


    @ManyToOne
    // ➜ Plusieurs tickets peuvent être assignés à 1 agent
    @JoinColumn(name = "agent_id")
    private User agent;  // agent responsable



    /*
     * ==============================
     * CONSTRUCTEURS
     * ==============================
     */

    // ➜ Constructeur vide OBLIGATOIRE pour JPA/Hibernate
    public Ticket() {
        this.createdDate = LocalDateTime.now(); // date auto
        this.status = Status.OPEN;              // statut par défaut
        this.priority = Priority.MEDIUM;        // priorité par défaut
    }

    // ➜ Constructeur personnalisé pour créer facilement un ticket
    public Ticket(String title, String description, User user) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.createdDate = LocalDateTime.now();
        this.status = Status.OPEN;
        this.priority = Priority.MEDIUM;
    }



    /*
     * ==============================
     * GETTERS & SETTERS
     * ==============================
     * Permettent à Spring/JPA/Jackson
     * d'accéder aux champs de l'objet
     */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }



    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }



    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



    public User getAgent() {
        return agent;
    }

    public void setAgent(User agent) {
        this.agent = agent;
    }
}
