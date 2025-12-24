package com.projeto.logitrack.dto.response;

import com.projeto.logitrack.enums.StatusVehicle;

import java.time.LocalDate;

public class StatusHistoryResponse {

    private Integer id;
    private StatusVehicle historyPrevious;
    private StatusVehicle historyNew;
    private LocalDate date;
    private String userName;
    private String vehiclePlate;

    public StatusHistoryResponse() {}

    public StatusHistoryResponse(Integer id, StatusVehicle historyPrevious, StatusVehicle historyNew, LocalDate date, String userName, String vehiclePlate) {
        this.id = id;
        this.historyPrevious = historyPrevious;
        this.historyNew = historyNew;
        this.date = date;
        this.userName = userName;
        this.vehiclePlate = vehiclePlate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StatusVehicle getHistoryPrevious() {
        return historyPrevious;
    }

    public void setHistoryPrevious(StatusVehicle historyPrevious) {
        this.historyPrevious = historyPrevious;
    }

    public StatusVehicle getHistoryNew() {
        return historyNew;
    }

    public void setHistoryNew(StatusVehicle historyNew) {
        this.historyNew = historyNew;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public void setVehiclePlate(String vehiclePlate) {
        this.vehiclePlate = vehiclePlate;
    }
}
