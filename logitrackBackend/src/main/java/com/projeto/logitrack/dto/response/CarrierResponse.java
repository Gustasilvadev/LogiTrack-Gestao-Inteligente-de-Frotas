package com.projeto.logitrack.dto.response;

public class CarrierResponse {

    private Integer id;
    private String name;
    private String cnpj;
    private String logicalStatus;

    public CarrierResponse() {}

    public CarrierResponse(Integer id, String name, String cnpj, String logicalStatus) {
        this.id = id;
        this.name = name;
        this.cnpj = cnpj;
        this.logicalStatus = logicalStatus;
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

    public String getLogicalStatus() {
        return logicalStatus;
    }

    public void setLogicalStatus(String logicalStatus) {
        this.logicalStatus = logicalStatus;
    }
}
