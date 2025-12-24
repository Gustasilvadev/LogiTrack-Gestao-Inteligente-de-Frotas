package com.projeto.logitrack.repository;

import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    // Usado na autenticação e validação (Exclui deletados)
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.logicalStatus != :status")
    Optional<User> findByEmail(String email, LogicalStatus status);

    @Query("SELECT u FROM User u WHERE u.carrier.id = :carrierId AND u.logicalStatus = :status")
    List<User> findAllByCarrierId(Integer carrierId, LogicalStatus status);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.logicalStatus != :status")
    Optional<User> findByIdActive(Integer id, LogicalStatus status);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.logicalStatus = :status WHERE u.id = :id")
    void softDelete(Integer id, LogicalStatus status);
}
