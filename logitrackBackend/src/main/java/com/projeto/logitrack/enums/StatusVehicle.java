package com.projeto.logitrack.enums;

public enum StatusVehicle {

    DISPONIVEL(1),
    EM_ROTA(0),
    MANUTENCAO(-1);



    private final Integer code;

    StatusVehicle(Integer code){
        this.code = code;
    }

    public Integer getCode(){
        return code;
    }

    public static  StatusVehicle fromCode(Integer code){
        for (StatusVehicle statusVehicle : values()){
            if(statusVehicle.getCode().equals(code)){
                return statusVehicle;
            }
        }
        throw new IllegalArgumentException("Código inválido para o status do veículo: "+code);
    }
}
