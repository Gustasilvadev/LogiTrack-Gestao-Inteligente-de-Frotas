package com.projeto.logitrack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="carrier")
public class Carrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="carrier_id")
    private Integer id;

    @Column(name="carrier_name")
    private String name;

    @Column(name="carrier_cnpj")
    private String cnpj;

    @Column(name="carrier_logical_status")
    private LogicalStatus logicalStatus;

    @OneToMany(mappedBy = "carrier")
    @JsonIgnore
    private List<Vehicle> vehicles;

    @PrePersist
    public void logicalStatusPersist(){
        if(this.logicalStatus == null){
            this.logicalStatus = LogicalStatus.ATIVO;
        }
    }
    public Carrier() {
    }

    public Carrier(Integer id, String name, String cnpj, LogicalStatus logicalStatus, List<Vehicle> vehicles) {
        this.id = id;
        this.name = name;
        this.cnpj = cnpj;
        this.logicalStatus = logicalStatus;
        this.vehicles = vehicles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public LogicalStatus getLogicalStatus() {
        return logicalStatus;
    }

    public void setLogicalStatus(LogicalStatus logicalStatus) {
        this.logicalStatus = logicalStatus;
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }
}
