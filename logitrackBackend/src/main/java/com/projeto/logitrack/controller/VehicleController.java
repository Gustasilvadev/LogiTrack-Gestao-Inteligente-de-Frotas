package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.VehicleRequest;
import com.projeto.logitrack.dto.response.VehicleResponse;
import com.projeto.logitrack.service.VehicleService;
import com.projeto.logitrack.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/createVehicle")
    public ResponseEntity<VehicleResponse> create(@RequestBody VehicleRequest request,
                                                  @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(vehicleService.create(request, userDetails.getUser()));
    }

    @GetMapping("/listVehicles")
    public ResponseEntity<List<VehicleResponse>> listAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails.getUser().getCarrier() == null) {
            throw new RuntimeException("Administradores não possuem veículos vinculados diretamente.");
        }
        return ResponseEntity.ok(vehicleService.findAllActive(userDetails.getUser().getCarrier().getId()));
    }

    @GetMapping("/listVehicleById/{id}")
    public ResponseEntity<VehicleResponse> getById(@PathVariable Integer id,
                                                   @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(vehicleService.findById(id, userDetails.getUser().getCarrier().getId()));
    }

    @PutMapping("/updateVehicleStatusById/{id}")
    public ResponseEntity<VehicleResponse> updateStatus(@PathVariable Integer id,
                                                        @RequestBody VehicleRequest request,
                                                        @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(vehicleService.update(id, request, userDetails.getUser()));
    }

    @DeleteMapping("/deleteVehicleById/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        vehicleService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}
