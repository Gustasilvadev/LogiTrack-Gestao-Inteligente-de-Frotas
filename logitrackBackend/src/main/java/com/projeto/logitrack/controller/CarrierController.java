package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.request.CarrierRequest;
import com.projeto.logitrack.dto.response.CarrierResponse;
import com.projeto.logitrack.service.CarrierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carriers")
public class CarrierController {

    @Autowired
    private CarrierService carrierService;

    @PostMapping("/createCarrier")
    public ResponseEntity<CarrierResponse> create(@RequestBody CarrierRequest request) {
        return ResponseEntity.ok(carrierService.create(request));
    }

    @GetMapping("/listCarrier")
    public ResponseEntity<List<CarrierResponse>> listAll() {
        return ResponseEntity.ok(carrierService.findAllActive());
    }

    @GetMapping("/listCarrierById/{id}")
    public ResponseEntity<CarrierResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(carrierService.findById(id));
    }

    @PutMapping("/updateCarrierById/{id}")
    public ResponseEntity<CarrierResponse> update(@PathVariable Integer id, @RequestBody CarrierRequest request) {
        return ResponseEntity.ok(carrierService.update(id, request));
    }

    @DeleteMapping("deleteCarrierById/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        carrierService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}
