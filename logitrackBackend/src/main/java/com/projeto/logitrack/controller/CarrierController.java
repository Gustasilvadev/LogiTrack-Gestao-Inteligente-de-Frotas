package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.CarrierRequest;
import com.projeto.logitrack.dto.response.CarrierResponse;
import com.projeto.logitrack.entity.Carrier;
import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.service.CarrierService;
import com.projeto.logitrack.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carriers")
@CrossOrigin("*")
public class CarrierController {

    @Autowired
    private CarrierService carrierService;

    @PostMapping("/createCarrier")
    public ResponseEntity<CarrierResponse> create(@RequestBody CarrierRequest request) {
        return ResponseEntity.ok(carrierService.create(request));
    }

    @GetMapping("/listCarrierActive")
    public ResponseEntity<List<CarrierResponse>> listAllActives() {
        return ResponseEntity.ok(carrierService.findAllActive());
    }

    @GetMapping("/listCarrier")
    public ResponseEntity<List<CarrierResponse>> listAll() {
        List<CarrierResponse> carriers = carrierService.listAllForAdmin();
        return ResponseEntity.ok(carriers);
    }

    @GetMapping("/listCarrierById/{id}")
    public ResponseEntity<CarrierResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(carrierService.findById(id));
    }

    @PutMapping("/updateCarrierById/{id}")
    public ResponseEntity<CarrierResponse> update(@PathVariable Integer id, @RequestBody CarrierRequest request) {
        return ResponseEntity.ok(carrierService.update(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(
            @PathVariable Integer id,
            @RequestParam LogicalStatus status
    ) {
        carrierService.changeStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/myCarrier")
    public ResponseEntity<?> getMyCarrier(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            // Pega o usuário do Token
            User user = userDetails.getUser();

            // Pega a transportadora vinculada
            Carrier carrier = user.getCarrier();

            if (carrier == null) {
                return ResponseEntity.status(404).body("Usuário não possui transportadora vinculada.");
            }
            // Mapeia e retorna
            return ResponseEntity.ok(carrierService.mapToResponse(carrier));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar dados: " + e.getMessage());
        }
    }
}
