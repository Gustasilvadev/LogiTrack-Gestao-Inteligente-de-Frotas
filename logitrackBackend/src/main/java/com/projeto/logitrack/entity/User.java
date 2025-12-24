package com.projeto.logitrack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;

    @Column(name="user_name")
    private Integer name;

    @Column(name="user_email")
    private Integer email;

    @Column(name="user_password")
    private Integer password;

    @Column(name="user_logical_status")
    private LogicalStatus logicalStatus;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<StatusHistory> statusHistory;

    @ManyToOne
    @JoinColumn(name="carrier_id")
    private Carrier carrier;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name="user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    private List<Role> role;

    public User() {
    }

    public User(Integer id, Integer name, Integer email, Integer password, LogicalStatus logicalStatus, List<StatusHistory> statusHistory, Carrier carrier, List<Role> role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.logicalStatus = logicalStatus;
        this.statusHistory = statusHistory;
        this.carrier = carrier;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
    }

    public Integer getEmail() {
        return email;
    }

    public void setEmail(Integer email) {
        this.email = email;
    }

    public Integer getPassword() {
        return password;
    }

    public void setPassword(Integer password) {
        this.password = password;
    }

    public LogicalStatus getLogicalStatus() {
        return logicalStatus;
    }

    public void setLogicalStatus(LogicalStatus logicalStatus) {
        this.logicalStatus = logicalStatus;
    }

    public List<StatusHistory> getStatusHistory() {
        return statusHistory;
    }

    public void setStatusHistory(List<StatusHistory> statusHistory) {
        this.statusHistory = statusHistory;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    public List<Role> getRole() {
        return role;
    }

    public void setRole(List<Role> role) {
        this.role = role;
    }
}
