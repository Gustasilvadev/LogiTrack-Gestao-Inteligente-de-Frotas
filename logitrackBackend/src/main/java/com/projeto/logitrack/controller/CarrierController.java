package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.CarrierRequest;
import com.projeto.logitrack.dto.response.CarrierResponse;
import com.projeto.logitrack.enums.LogicalStatus;
import com.projeto.logitrack.service.CarrierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
