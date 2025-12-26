package com.projeto.logitrack.enums;

public enum LogicalStatus {

    APAGADO(-1),
    INATIVO(0),
    ATIVO(1);

    private final Integer code;

    LogicalStatus(Integer code){
        this.code = code;
    }

    public Integer getCode(){
        return code;
    }

    public static  LogicalStatus fromCode(Integer code){
        for (LogicalStatus logicalStatus : values()){
            if(logicalStatus.getCode().equals(code)){
                return logicalStatus;
            }
        }
        throw new IllegalArgumentException("Código inválido para o status lógico do veículo: "+code);
    }
}