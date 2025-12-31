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
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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

        // Gera o token
        String token = jwtTokenService.generateToken(userDetails);

        // Extrai o nome da Role (ex: "ADMIN", "MANAGER" ou "OPERADOR")
        // Se o seu User tiver uma lista de roles, pegamos a primeira:
        String roleName = userDetails.getUser().getRole().stream()
                .findFirst()
                .map(role -> role.getName().name()) // Isso retorna "ROLE_ADMIN"
                .orElse("ROLE_OPERATOR");

        String roleFinal = roleName.replace("ROLE_", "");

        // Retorna o objeto completo com a Role
        return new JwtTokenResponse(
                token,
                userDetails.getUser().getName(),
                userDetails.getUser().getEmail(),
                roleFinal
        );
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
        Carrier carrier = carrierRepository.findByCnpj(request.getCarrierCnpj(), LogicalStatus.APAGADO)
                .orElseThrow(() -> new RuntimeException("Transportadora não encontrada ou inativa com o CNPJ informado"));

        User user = prepareUserEntity(request);
        user.setCarrier(carrier);
        user.setRole(List.of(fetchRole(RoleName.ROLE_MANAGER)));

        return mapToResponse(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateUser(Integer id, UserRequest request, User loggedUser) {
        // 1. Busca o usuário que será editado
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        // 2. VALIDAÇÃO DE SEGURANÇA: O gestor logado é da mesma transportadora?
        if (!userToUpdate.getCarrier().getId().equals(loggedUser.getCarrier().getId())) {
            throw new RuntimeException("Você não tem permissão para editar usuários de outra transportadora.");
        }
        userToUpdate.setName(request.getName());
        userToUpdate.setEmail(request.getEmail());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            userToUpdate.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        User savedUser = userRepository.save(userToUpdate);
        return mapToResponse(savedUser);
    }

    // --- MÉTODOS AUXILIARES ---

    private User prepareUserEntity(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // Criptografia da senha usando o PasswordEncoder configurado no Security
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setLogicalStatus(LogicalStatus.ATIVO);
        return user;
    }

    private Role fetchRole(RoleName roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role " + roleName + " não encontrada no banco"));
    }

    private void validateEmailUnique(String email) {
        if (userRepository.findByEmail(email, LogicalStatus.APAGADO).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado no sistema.");
        }
    }

    public List<UserResponse> listOperatorsForManager(Integer carrierId) {
        return userRepository.findAllByCarrierIdAndNotDeleted(carrierId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<UserResponse> listAllForAdmin() {
        return userRepository.findAllManagersAndOperators()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void changeStatus(Integer id, LogicalStatus newStatus) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        userRepository.updateStatus(id, newStatus);
    }

    private UserResponse mapToResponse(User u) {
        String roleStr = u.getRole().isEmpty() ? "N/A" : u.getRole().get(0).getName().name();
        String carrierName = (u.getCarrier() != null) ? u.getCarrier().getName() : "LogiTrack Sistema";

        return new UserResponse(
                u.getId(),
                u.getName(),
                u.getEmail(),
                roleStr,
                carrierName,
                u.getLogicalStatus().name()
        );
    }
}