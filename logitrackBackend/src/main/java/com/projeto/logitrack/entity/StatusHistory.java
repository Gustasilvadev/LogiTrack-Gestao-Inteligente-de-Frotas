package com.projeto.logitrack.entity;

import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.StatusVehicle;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="status_history")
public class StatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="status_history_id")
    private Integer id;

    @Column(name="status_history_previous")
    private StatusVehicle statusVehiclePrevious;

    @Column(name="status_history_new")
    private StatusVehicle statusVehicleNew;

    @Column(name="status_history_date")
    private LocalDate date;

    @Column(name="status_history_logical_status")
    private LogicalStatus logicalStatus;

    @ManyToOne
    @JoinColumn(name="carrier_id")
    private Carrier carrier;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="vehicle_id")
    private Vehicle vehicle;

    public StatusHistory() {
    }

    public StatusHistory(Integer id, StatusVehicle statusVehiclePrevious, StatusVehicle statusVehicleNew, LocalDate date, LogicalStatus logicalStatus, Carrier carrier, User user, Vehicle vehicle) {
        this.id = id;
        this.statusVehiclePrevious = statusVehiclePrevious;
        this.statusVehicleNew = statusVehicleNew;
        this.date = date;
        this.logicalStatus = logicalStatus;
        this.carrier = carrier;
        this.user = user;
        this.vehicle = vehicle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StatusVehicle getStatusVehiclePrevious() {
        return statusVehiclePrevious;
    }

    public void setStatusVehiclePrevious(StatusVehicle statusVehiclePrevious) {
        this.statusVehiclePrevious = statusVehiclePrevious;
    }

    public StatusVehicle getStatusVehicleNew() {
        return statusVehicleNew;
    }

    public void setStatusVehicleNew(StatusVehicle statusVehicleNew) {
        this.statusVehicleNew = statusVehicleNew;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LogicalStatus getLogicalStatus() {
        return logicalStatus;
    }

    public void setLogicalStatus(LogicalStatus logicalStatus) {
        this.logicalStatus = logicalStatus;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
