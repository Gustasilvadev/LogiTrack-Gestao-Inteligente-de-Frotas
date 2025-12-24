package com.projeto.logitrack.service;

import com.projeto.logitrack.dto.request.LoginUserRequest;
import com.projeto.logitrack.dto.request.UserRequest;
import com.projeto.logitrack.dto.response.JwtTokenResponse;
import com.projeto.logitrack.dto.response.UserResponse;
import com.projeto.logitrack.entity.Carrier;
import com.projeto.logitrack.entity.Role;
import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.enums.RoleName;
import com.projeto.logitrack.repository.CarrierRepository;
import com.projeto.logitrack.repository.RoleRepository;
import com.projeto.logitrack.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CarrierRepository carrierRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       CarrierRepository carrierRepository,
                       AuthenticationManager authenticationManager,
                       JwtTokenService jwtTokenService,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.carrierRepository = carrierRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    // --- AUTENTICAÇÃO ---

    public JwtTokenResponse authenticate(LoginUserRequest loginUserRequest) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserRequest.getEmail(), loginUserRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtTokenResponse(jwtTokenService.generateToken(userDetails));
    }

    // --- CRIAÇÃO DE USUÁRIOS ---

    // 1. Criar Operador (Usado pelo GESTOR logado - Herda a Carrier automaticamente)
    public UserResponse createOperator(UserRequest request, User gestorLogado) {
        validateEmailUnique(request.getEmail());

        User user = prepareUserEntity(request);
        user.setCarrier(gestorLogado.getCarrier()); // Herança automática
        user.setRole(List.of(fetchRole(RoleName.ROLE_OPERATOR)));

        return mapToResponse(userRepository.save(user));
    }

    // 2. Criar Gestor (Usado pelo ADMIN - Precisa do CNPJ no request)
    public UserResponse createManager(UserRequest request) {
        validateEmailUnique(request.getEmail());

        // Atualizado para passar o status DELETED como filtro negativo
        Carrier carrier = carrierRepository.findByCnpj(request.getCarrierCnpj(), LogicalStatus.DELETED)
                .orElseThrow(() -> new RuntimeException("Transportadora não encontrada ou inativa com o CNPJ informado"));

        User user = prepareUserEntity(request);
        user.setCarrier(carrier);
        user.setRole(List.of(fetchRole(RoleName.ROLE_MANAGER)));

        return mapToResponse(userRepository.save(user));
    }

    // --- MÉTODOS AUXILIARES E CRUD ---

    private User prepareUserEntity(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Criptografia da senha usando o PasswordEncoder configurado no Security
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setLogicalStatus(LogicalStatus.ACTIVE);
        return user;
    }

    private Role fetchRole(RoleName roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role " + roleName + " não encontrada no banco"));
    }

    private void validateEmailUnique(String email) {
        if (userRepository.findByEmail(email, LogicalStatus.DELETED).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado no sistema.");
        }
    }

    public List<UserResponse> findAllActive(Integer carrierId) {
        return userRepository.findAllByCarrierId(carrierId, LogicalStatus.ACTIVE)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public void softDelete(Integer id) {
        userRepository.softDelete(id, LogicalStatus.DELETED);
    }

    private UserResponse mapToResponse(User u) {
        String roleStr = u.getRole().isEmpty() ? "N/A" : u.getRole().get(0).getName().name();
        return new UserResponse(u.getId(), u.getName(), u.getEmail(),
                roleStr, u.getCarrier().getName());
    }
}