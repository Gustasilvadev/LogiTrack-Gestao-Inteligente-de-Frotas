package com.projeto.logitrack.service;
import com.projeto.logitrack.dto.request.VehicleRequest;
import com.projeto.logitrack.dto.response.VehicleResponse;
import com.projeto.logitrack.entity.*;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.StatusVehicle;
import com.projeto.logitrack.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired private VehicleRepository repository;
    @Autowired private StatusHistoryRepository historyRepository;

    @Transactional
    public VehicleResponse create(VehicleRequest request, User currentUser) {
        Vehicle v = new Vehicle();
        v.setPlate(request.getPlate());
        v.setModel(request.getModel());
        v.setCapacity(request.getCapacity());
        v.setDriverName(request.getDriverName());
        v.setStatusVehicle(request.getStatusVehicle());
        v.setCarrier(currentUser.getCarrier()); // Multi-tenancy
        v.setLogicalStatus(LogicalStatus.ACTIVE);
        return mapToResponse(repository.save(v));
    }

    @Transactional
    public VehicleResponse updateStatus(Integer id, VehicleRequest request, User currentUser) {
        Vehicle v = repository.findByIdActive(id, LogicalStatus.DELETED)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        // Guardamos o status atual antes de mudar para comparar
        StatusVehicle statusNovo = request.getStatusVehicle();

        if (!v.getStatusVehicle().equals(statusNovo)) {
            // Chamada correta passando o Enum
            createHistory(v, statusNovo, currentUser);
        }

        v.setStatusVehicle(statusNovo);
        v.setDriverName(request.getDriverName());

        return mapToResponse(repository.save(v));
    }

    public List<VehicleResponse> findAllActive(Integer carrierId) {
        return repository.findAllActiveByCarrier(carrierId, LogicalStatus.ACTIVE)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public VehicleResponse findById(Integer id, Integer carrierId) {
        // Garante que o usuário só veja veículos da própria transportadora
        return repository.findByIdActive(id, LogicalStatus.DELETED)
                .filter(v -> v.getCarrier().getId().equals(carrierId))
                .map(this::mapToResponse).orElseThrow(() -> new RuntimeException("Acesso negado ou não encontrado"));
    }

    public void softDelete(Integer id) {
        repository.softDelete(id, LogicalStatus.DELETED);
    }

    private void createHistory(Vehicle v, StatusVehicle newStatus, User user) {
        StatusHistory history = new StatusHistory();

        history.setStatusVehiclePrevious(v.getStatusVehicle());
        history.setStatusVehicleNew(newStatus);

        history.setDate(LocalDate.now());
        history.setVehicle(v);
        history.setUser(user);
        history.setCarrier(user.getCarrier());
        history.setLogicalStatus(LogicalStatus.ACTIVE);

        historyRepository.save(history);
    }

    private VehicleResponse mapToResponse(Vehicle v) {
        return new VehicleResponse(v.getId(), v.getPlate(), v.getModel(), v.getCapacity(),
                v.getDriverName(), v.getStatusVehicle(), v.getLogicalStatus());
    }
}