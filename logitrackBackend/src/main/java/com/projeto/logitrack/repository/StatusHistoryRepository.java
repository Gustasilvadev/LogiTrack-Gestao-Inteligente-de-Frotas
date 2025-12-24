package com.projeto.logitrack.repository;

import com.projeto.logitrack.entity.StatusHistory;
import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Integer> {

    @Query("SELECT sh FROM StatusHistory sh WHERE sh.carrier.id = :carrierId AND sh.logicalStatus = :status")
    List<StatusHistory> findAllActiveByCarrier(Integer carrierId, LogicalStatus status);

    @Query("SELECT sh FROM StatusHistory sh WHERE sh.id = :id AND sh.logicalStatus != :status")
    Optional<StatusHistory> findByIdActive(Integer id, LogicalStatus status);

    @Transactional
    @Modifying
    @Query("UPDATE StatusHistory sh SET sh.logicalStatus = :status WHERE sh.id = :id")
    void softDelete(Integer id, LogicalStatus status);
}
