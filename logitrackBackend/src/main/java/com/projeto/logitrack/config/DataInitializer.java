package com.projeto.logitrack.config;

import com.projeto.logitrack.entity.Role;
import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.RoleName;
import com.projeto.logitrack.repository.RoleRepository;
import com.projeto.logitrack.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // Construtor manual para Injeção de Dependência
    public DataInitializer(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Iniciando a carga de dados inicial...");

        this.initializeRoles();
        this.initializeAdminUser();

        log.info("Carga de dados finalizada com sucesso.");
    }

    private void initializeRoles() {
        Arrays.stream(RoleName.values()).forEach(roleName -> {
            if (roleRepository.findByName(roleName).isEmpty()) {
                Role role = new Role();
                role.setName(roleName);
                roleRepository.save(role);
                log.info("Role {} criada.", roleName);
            }
        });
    }

    private void initializeAdminUser() {
        String adminEmail = "admin@logitrack.com";

        // Verifica se o admin já existe (considerando status lógico)
        if (userRepository.findByEmail(adminEmail, LogicalStatus.APAGADO).isEmpty()) {
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Erro: Role ADMIN não encontrada."));

            User admin = new User();
            admin.setName("Administrador Geral");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setLogicalStatus(LogicalStatus.ATIVO);

            // Atribui a Role recuperada do banco
            admin.setRole(List.of(adminRole));

            userRepository.save(admin);
            log.info(">>> Usuário ADMIN criado: {} / admin123", adminEmail);
        }
    }
}