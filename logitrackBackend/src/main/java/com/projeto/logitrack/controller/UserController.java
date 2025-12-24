package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.LoginUserRequest;
import com.projeto.logitrack.dto.request.UserRequest;
import com.projeto.logitrack.dto.response.JwtTokenResponse;
import com.projeto.logitrack.dto.response.UserResponse;
import com.projeto.logitrack.service.UserService;
import com.projeto.logitrack.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
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

    @GetMapping("/listTeam")
    public ResponseEntity<List<UserResponse>> listAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(userService.findAllActive(userDetails.getUser().getCarrier().getId()));
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}
