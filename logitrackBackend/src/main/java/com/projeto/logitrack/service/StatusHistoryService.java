package com.projeto.logitrack.service;

import com.projeto.logitrack.dto.response.StatusHistoryResponse;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.repository.StatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusHistoryService {


    @Autowired private StatusHistoryRepository repository;

    public List<StatusHistoryResponse> findAllByCarrier(Integer carrierId) {
        return repository.findAllActiveByCarrier(carrierId, LogicalStatus.ACTIVE)
                .stream().map(h -> new StatusHistoryResponse(
                        h.getId(), h.getStatusVehiclePrevious(), h.getStatusVehicleNew(),
                        h.getDate(), h.getUser().getName(), h.getVehicle().getPlate()
                )).collect(Collectors.toList());
    }

    public void softDelete(Integer id) {
        repository.softDelete(id, LogicalStatus.DELETED);
    }
}



