package com.projeto.logitrack.dto.request;

import com.projeto.logitrack.enums.StatusVehicle;

public class VehicleRequest {

    private String plate;
    private String model;
    private String capacity;
    private String driverName;
    private StatusVehicle statusVehicle;

    public VehicleRequest() {}

    public VehicleRequest(String plate, String model, String capacity, String driverName, StatusVehicle statusVehicle) {
        this.plate = plate;
        this.model = model;
        this.capacity = capacity;
        this.driverName = driverName;
        this.statusVehicle = statusVehicle;
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
}
