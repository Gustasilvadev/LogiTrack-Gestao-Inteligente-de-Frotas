package com.projeto.logitrack.converter;
import com.projeto.logitrack.enums.StatusVehicle;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusVehicleConverter implements AttributeConverter<StatusVehicle, Integer> {

    @Override
    public Integer convertToDatabaseColumn(StatusVehicle status) {
        if (status == null) return null;
        return status.getCode(); // Salva o número (ex: 1, 2, 3) no banco
    }

    @Override
    public StatusVehicle convertToEntityAttribute(Integer code) {
        if (code == null) return null;
        for (StatusVehicle status : StatusVehicle.values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Código de status de veículo inválido: " + code);
    }
}