package com.projeto.logitrack.repository;

import com.projeto.logitrack.entity.Vehicle;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.StatusVehicle;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    // Lista toda a frota ativa de uma transportadora
    @Query("SELECT v FROM Vehicle v WHERE v.carrier.id = :carrierId AND v.logicalStatus = :status")
    List<Vehicle> findAllActiveByCarrier(Integer carrierId, LogicalStatus status);

    // QUERY SOLICITADA: Filtra por Status Operacional (Disponível, Em Rota, Manutenção)
    @Query("SELECT v FROM Vehicle v WHERE v.carrier.id = :carrierId " +
            "AND v.statusVehicle = :statusV AND v.logicalStatus = :statusL")
    List<Vehicle> findByStatusAndCarrier(Integer carrierId, StatusVehicle statusV, LogicalStatus statusL);

    @Query("SELECT v FROM Vehicle v WHERE v.id = :id AND v.logicalStatus != :status")
    Optional<Vehicle> findByIdActive(Integer id, LogicalStatus status);

    @Transactional
    @Modifying
    @Query("UPDATE Vehicle v SET v.logicalStatus = :status WHERE v.id = :id")
    void softDelete(Integer id, LogicalStatus status);

    @Transactional
    @Modifying
    @Query("UPDATE Vehicle v SET v.logicalStatus = :status WHERE v.id = :id")
    void updateStatus(@Param("id") Integer id, @Param("status") LogicalStatus status);
}
