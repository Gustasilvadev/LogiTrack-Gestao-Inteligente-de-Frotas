package com.projeto.logitrack.dto.response;

import com.projeto.logitrack.entity.Vehicle;
import com.projeto.logitrack.enums.StatusVehicle;

public class VehicleResponse {

    private Integer id;
    private String plate;
    private String model;
    private String capacity;
    private String driverName;
    private String statusVehicle;
    private String logicalStatus;

    public VehicleResponse() {}

    public VehicleResponse(Vehicle vehicle) {
        this.id = vehicle.getId();
        this.plate = vehicle.getPlate();
        this.model = vehicle.getModel();
        this.capacity = vehicle.getCapacity();
        this.driverName = vehicle.getDriverName();

        // Tratamento para StatusVehicle (Enum -> String)
        this.statusVehicle = (vehicle.getStatusVehicle() != null)
                ? vehicle.getStatusVehicle().name()
                : "DISPONIVEL";

        // Tratamento para LogicalStatus (Enum -> String)
        this.logicalStatus = (vehicle.getLogicalStatus() != null)
                ? vehicle.getLogicalStatus().name()
                : "INATIVO";
    }

    public VehicleResponse(Integer id, String plate, String model, String capacity, String driverName, String statusVehicle, String logicalStatus) {
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

    public String getStatusVehicle() {
        return statusVehicle;
    }

    public void setStatusVehicle(String statusVehicle) {
        this.statusVehicle = statusVehicle;
    }

    public String getLogicalStatus() {
        return logicalStatus;
    }

    public void setLogicalStatus(String logicalStatus) {
        this.logicalStatus = logicalStatus;
    }
}
