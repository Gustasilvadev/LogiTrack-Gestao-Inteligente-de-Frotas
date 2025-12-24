package com.projeto.logitrack.entity;

import com.projeto.logitrack.enums.RoleName;
import jakarta.persistence.*;

@Entity
@Table(name="role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name="role_name")
    private RoleName name;

    public Role() {
    }

    public Role(Integer id, RoleName name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }
}
