package com.helpdesk.backend.model;

import jakarta.persistence.*;

/*
 * ==============================
 * ENTITY : User
 * ==============================
 * Cette classe représente la table "user" dans la base de données.
 * Elle correspond aux utilisateurs du système (client ou agent).
 */

@Entity
// ➜ Indique que cette classe est une entité JPA (table SQL)
public class User {



    /*
     * ==============================
     * PRIMARY KEY
     * ==============================
     */

    @Id
    // ➜ Clé primaire de la table
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ➜ Auto-increment (1,2,3...)
    private Long id;



    /*
     * ==============================
     * COLONNES
     * ==============================
     */

    // ➜ Nom de l'utilisateur (ex: Amine, Admin, Support1)
    private String name;

    // ➜ Email de l'utilisateur
    private String email;



    /*
     * ==============================
     * GETTERS & SETTERS
     * ==============================
     * Nécessaires pour :
     * - JPA (Hibernate)
     * - Spring
     * - JSON (Jackson)
     */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
