package com.projeto.logitrack.service;

import com.projeto.logitrack.dto.request.CarrierRequest;
import com.projeto.logitrack.dto.response.CarrierResponse;
import com.projeto.logitrack.entity.Carrier;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.repository.CarrierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarrierService {

    @Autowired private CarrierRepository repository;

    public CarrierResponse create(CarrierRequest request) {
        Carrier carrier = new Carrier();
        carrier.setName(request.getName());
        carrier.setCnpj(request.getCnpj());
        carrier.setLogicalStatus(LogicalStatus.ACTIVE);
        return mapToResponse(repository.save(carrier));
    }

    public CarrierResponse update(Integer id, CarrierRequest request) {
        Carrier carrier = repository.findByIdActive(id, LogicalStatus.DELETED)
                .orElseThrow(() -> new RuntimeException("Transportadora não encontrada"));
        carrier.setName(request.getName());
        carrier.setCnpj(request.getCnpj());
        return mapToResponse(repository.save(carrier));
    }

    public List<CarrierResponse> findAllActive() {
        return repository.findAllActive(LogicalStatus.ACTIVE)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public CarrierResponse findById(Integer id) {
        return repository.findByIdActive(id, LogicalStatus.DELETED)
                .map(this::mapToResponse).orElseThrow(() -> new RuntimeException("Não encontrado"));
    }

    public void softDelete(Integer id) {
        repository.softDelete(id, LogicalStatus.DELETED);
    }

    private CarrierResponse mapToResponse(Carrier c) {
        return new CarrierResponse(c.getId(), c.getName(), c.getCnpj(), c.getLogicalStatus());
    }
}