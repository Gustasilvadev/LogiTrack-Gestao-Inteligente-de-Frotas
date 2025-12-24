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

    // FindAllAtivos
    @Query("SELECT c FROM Carrier c WHERE c.logicalStatus = :status")
    List<Carrier> findAllActive(LogicalStatus status);

    @Query("SELECT c FROM Carrier c WHERE c.cnpj = :cnpj AND c.logicalStatus != :status")
    Optional<Carrier> findByCnpj(String cnpj, LogicalStatus status);

    // FindById (Garante que não está deletado)
    @Query("SELECT c FROM Carrier c WHERE c.id = :id AND c.logicalStatus != :status")
    Optional<Carrier> findByIdActive(Integer id, LogicalStatus status);

    // SoftDelete
    @Transactional
    @Modifying
    @Query("UPDATE Carrier c SET c.logicalStatus = :status WHERE c.id = :id")
    void softDelete(Integer id, LogicalStatus status);
}
