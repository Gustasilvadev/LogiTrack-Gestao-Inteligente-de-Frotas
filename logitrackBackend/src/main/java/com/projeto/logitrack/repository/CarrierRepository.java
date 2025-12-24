package com.projeto.logitrack.repository;

import com.projeto.logitrack.entity.Carrier;
import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Integer> {

    // 1. FindAllAtivos
    @Query("SELECT c FROM Carrier c WHERE c.logicalStatus = :status")
    List<Carrier> findAllActive(LogicalStatus status);

    // 2. FindById (Garante que não está deletado)
    @Query("SELECT c FROM Carrier c WHERE c.id = :id AND c.logicalStatus != :status")
    Optional<Carrier> findByIdActive(Integer id, LogicalStatus status);

    // 3. SoftDelete
    @Transactional
    @Modifying
    @Query("UPDATE Carrier c SET c.logicalStatus = :status WHERE c.id = :id")
    void softDelete(Integer id, LogicalStatus status);
}
