package com.projeto.logitrack.repository;

import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.RoleName;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role r " +
            "JOIN FETCH u.carrier c " +
            "WHERE c.id = :carrierId " +
            "AND r.name = :roleName " +
            "AND u.logicalStatus = :status")
    List<User> findByCarrierAndRole(
            @Param("carrierId") Integer carrierId,
            @Param("roleName") RoleName roleName,
            @Param("status") LogicalStatus status
    );

    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role r " +
            "LEFT JOIN FETCH u.carrier c " +
            "WHERE r.name IN (com.projeto.logitrack.enums.RoleName.ROLE_MANAGER, com.projeto.logitrack.enums.RoleName.ROLE_OPERATOR)")
    List<User> findAllManagersAndOperators();

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.logicalStatus = :status WHERE u.id = :id")
    void updateStatus(@Param("id") Integer id, @Param("status") LogicalStatus status);

    @Query("SELECT u FROM User u WHERE u.carrier.id = :carrierId " +
            "AND u.logicalStatus <> com.projeto.logitrack.enums.LogicalStatus.APAGADO")
    List<User> findAllByCarrierIdAndNotDeleted(@Param("carrierId") Integer carrierId);

    @Query("SELECT u FROM User u WHERE u.email = :email " +
            "AND u.logicalStatus <> com.projeto.logitrack.enums.LogicalStatus.APAGADO")
    Optional<User> findByEmailAndNotDeleted(@Param("email") String email);
}
