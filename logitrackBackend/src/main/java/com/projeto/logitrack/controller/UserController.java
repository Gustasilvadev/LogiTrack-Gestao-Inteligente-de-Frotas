package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.LoginUserRequest;
import com.projeto.logitrack.dto.request.UserRequest;
import com.projeto.logitrack.dto.response.JwtTokenResponse;
import com.projeto.logitrack.dto.response.UserResponse;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.service.UserService;
import com.projeto.logitrack.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/loginUser")
    public ResponseEntity<JwtTokenResponse> login(@RequestBody LoginUserRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/createManager")
    public ResponseEntity<UserResponse> createManager(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.createManager(request));
    }

    @PostMapping("/createOperator")
    public ResponseEntity<UserResponse> createOperator(@RequestBody UserRequest request,
                                                       @AuthenticationPrincipal UserDetailsImpl userDetails) {
        // Passa o gestor logado para herdar a transportadora automaticamente
        return ResponseEntity.ok(userService.createOperator(request, userDetails.getUser()));
    }

    // Endpoint: GESTOR lista seu time
    @GetMapping("/listTeam")
    public ResponseEntity<List<UserResponse>> listTeam(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Integer carrierId = userDetails.getUser().getCarrier().getId();
        return ResponseEntity.ok(userService.listOperatorsForManager(carrierId));
    }

    // Endpoint: ADMIN lista todos os usuários do sistema
    @GetMapping("/listAllManagerOperators")
    public ResponseEntity<List<UserResponse>> listAll() {
        return ResponseEntity.ok(userService.listAllForAdmin());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(
            @PathVariable Integer id,
            @RequestParam LogicalStatus status
    ) {
        userService.changeStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
