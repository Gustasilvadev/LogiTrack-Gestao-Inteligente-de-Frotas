package com.projeto.logitrack.entity;

import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.StatusVehicle;
import jakarta.persistence.*;

@Entity
@Table(name="vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="vehicle_id")
    private Integer id;

    @Column(name="vehicle_plate")
    private String plate;

    @Column(name="vehicle_model")
    private String model;

    @Column(name="vehicle_driver_name")
    private String driverName;

    @Column(name="vehicle_capacity")
    private String capacity;

    @Column(name="vehicle_status")
    private StatusVehicle statusVehicle;

    @Column(name="vehicle_logical_status")
    private LogicalStatus logicalStatus;

    @ManyToOne
    @JoinColumn(name="carrier_id")
    private Carrier carrier;

    @PrePersist
    public void prePersistSetup() {
        // Define o status operacional padrão como Disponível
        if (this.statusVehicle == null) {
            this.statusVehicle = StatusVehicle.AVAILABLE;
        }

        // Define o status lógico padrão como Ativo
        if (this.logicalStatus == null) {
            this.logicalStatus = LogicalStatus.ACTIVE;
        }
    }

    public Vehicle() {
    }

    public Vehicle(Integer id, String plate, String model, String driverName, String capacity, StatusVehicle statusVehicle, LogicalStatus logicalStatus, Carrier carrier) {
        this.id = id;
        this.plate = plate;
        this.model = model;
        this.driverName = driverName;
        this.capacity = capacity;
        this.statusVehicle = statusVehicle;
        this.logicalStatus = logicalStatus;
        this.carrier = carrier;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public StatusVehicle getStatusVehicle() {
        return statusVehicle;
    }

    public void setStatusVehicle(StatusVehicle statusVehicle) {
        this.statusVehicle = statusVehicle;
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
}
