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
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private StatusHistoryRepository statusHistoryRepository;

    @Transactional
    public VehicleResponse create(VehicleRequest request, User currentUser) {
        Vehicle v = new Vehicle();
        v.setPlate(request.getPlate());
        v.setModel(request.getModel());
        v.setCapacity(request.getCapacity());
        v.setDriverName(request.getDriverName());
        v.setStatusVehicle(request.getStatusVehicle());
        v.setCarrier(currentUser.getCarrier()); // Multi-tenancy
        v.setLogicalStatus(LogicalStatus.ATIVO);
        return mapToResponse(vehicleRepository.save(v));
    }

    @Transactional
    public VehicleResponse update(Integer id, VehicleRequest request, User currentUser) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        // 1. Verifica se houve mudança de status para o histórico
        StatusVehicle statusAnterior = vehicle.getStatusVehicle();
        StatusVehicle novoStatus = request.getStatusVehicle();

        if (statusAnterior != novoStatus && novoStatus != null) {
            StatusHistory history = new StatusHistory();
            history.setVehicle(vehicle);
            history.setUser(currentUser);
            history.setStatusVehiclePrevious(statusAnterior);
            history.setStatusVehicleNew(novoStatus);
            history.setDate(LocalDate.now());
            history.setLogicalStatus(LogicalStatus.ATIVO);

            // Se sua tabela exige carrier_id no histórico:
            if (currentUser.getCarrier() != null) {
                history.setCarrier(currentUser.getCarrier());
            }

            statusHistoryRepository.save(history);
            vehicle.setStatusVehicle(novoStatus);
        }

        // 2. Atualiza os demais campos cadastrais
        if (request.getPlate() != null) vehicle.setPlate(request.getPlate());
        if (request.getModel() != null) vehicle.setModel(request.getModel());
        if (request.getCapacity() != null) vehicle.setCapacity(request.getCapacity());
        if (request.getDriverName() != null) vehicle.setDriverName(request.getDriverName());

        vehicleRepository.save(vehicle);

        return new VehicleResponse(vehicle);
    }

    public List<VehicleResponse> findAllActive(Integer carrierId) {
        return vehicleRepository.findAllActiveByCarrier(carrierId, LogicalStatus.ATIVO)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public VehicleResponse findById(Integer id, Integer carrierId) {
        // Garante que o usuário só veja veículos da própria transportadora
        return vehicleRepository.findByIdActive(id, LogicalStatus.APAGADO)
                .filter(v -> v.getCarrier().getId().equals(carrierId))
                .map(this::mapToResponse).orElseThrow(() -> new RuntimeException("Acesso negado ou não encontrado"));
    }

    public void changeStatus(Integer id, LogicalStatus newStatus) {
        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Veiculo não encontrado");
        }
        vehicleRepository.updateStatus(id, newStatus);
    }

    private void createHistory(Vehicle v, StatusVehicle newStatus, User user) {
        StatusHistory history = new StatusHistory();

        history.setStatusVehiclePrevious(v.getStatusVehicle());
        history.setStatusVehicleNew(newStatus);

        history.setDate(LocalDate.now());
        history.setVehicle(v);
        history.setUser(user);
        history.setCarrier(user.getCarrier());
        history.setLogicalStatus(LogicalStatus.ATIVO);

        statusHistoryRepository.save(history);
    }

    private VehicleResponse mapToResponse(Vehicle v) {
        return new VehicleResponse(
                v.getId(),
                v.getPlate(),
                v.getModel(),
                v.getCapacity(),
                v.getDriverName(),
                v.getStatusVehicle() != null ? v.getStatusVehicle().name() : "DISPONIVEL",
                v.getLogicalStatus() != null ? v.getLogicalStatus().name() : "ATIVO"
        );
    }
}