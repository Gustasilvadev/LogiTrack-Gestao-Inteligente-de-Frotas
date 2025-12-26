package com.projeto.logitrack.controller;

import com.projeto.logitrack.dto.response.StatusHistoryResponse;
import com.projeto.logitrack.service.StatusHistoryService;
import com.projeto.logitrack.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin("*")
public class StatusHistoryController {

    @Autowired
    private StatusHistoryService historyService;

    @GetMapping("/listHistoryByCarrier")
    public ResponseEntity<List<StatusHistoryResponse>> getHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(historyService.findAllByCarrier(userDetails.getUser().getCarrier().getId()));
    }

    @DeleteMapping("/deleteHistoryById/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        historyService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}