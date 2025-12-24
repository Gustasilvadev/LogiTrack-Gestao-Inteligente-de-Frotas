package com.projeto.logitrack.dto.response;

public class UserResponse {

    private Integer id;
    private String name;
    private String email;
    private String roleName;
    private String carrierName;

    public UserResponse() {}

    public UserResponse(Integer id, String name, String email, String roleName, String carrierName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roleName = roleName;
        this.carrierName = carrierName;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getCarrierName() {
        return carrierName;
    }

    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }
}
