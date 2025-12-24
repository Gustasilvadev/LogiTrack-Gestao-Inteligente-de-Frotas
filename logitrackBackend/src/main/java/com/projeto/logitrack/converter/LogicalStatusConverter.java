package com.projeto.logitrack.converter;

import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // autoApply faz com que ele funcione em todas as entidades automaticamente
public class LogicalStatusConverter implements AttributeConverter<LogicalStatus, Integer> {

    @Override
    public Integer convertToDatabaseColumn(LogicalStatus status) {
        if (status == null) return null;
        return status.getCode(); // Pega o número (1 ou -1)
    }

    @Override
    public LogicalStatus convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        // Lógica para transformar o número de volta no Enum
        for (LogicalStatus status : LogicalStatus.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("Código de status inválido: " + code);
    }
}
