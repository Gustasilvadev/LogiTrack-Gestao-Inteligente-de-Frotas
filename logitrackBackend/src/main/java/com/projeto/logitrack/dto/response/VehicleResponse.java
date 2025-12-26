package com.projeto.logitrack.dto.response;

import com.projeto.logitrack.entity.Vehicle;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.StatusVehicle;

public class VehicleResponse {

    private Integer id;
    private String plate;
    private String model;
    private String capacity;
    private String driverName;
    private StatusVehicle statusVehicle;
    private LogicalStatus logicalStatus;

    public VehicleResponse() {}

    public VehicleResponse(Vehicle vehicle) {
        this.id = vehicle.getId();
        this.plate = vehicle.getPlate();
        this.model = vehicle.getModel();
        this.capacity = vehicle.getCapacity();
        this.driverName = vehicle.getDriverName();
        this.statusVehicle = vehicle.getStatusVehicle();
        this.logicalStatus = vehicle.getLogicalStatus();
    }

    public VehicleResponse(Integer id, String plate, String model, String capacity, String driverName, StatusVehicle statusVehicle, LogicalStatus logicalStatus) {
        this.id = id;
        this.plate = plate;
        this.model = model;
        this.capacity = capacity;
        this.driverName = driverName;
        this.statusVehicle = statusVehicle;
        this.logicalStatus = logicalStatus;
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

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
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
}
