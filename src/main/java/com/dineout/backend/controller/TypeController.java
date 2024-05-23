package com.dineout.backend.controller;


import com.dineout.backend.entity.Type;
import com.dineout.backend.service.TypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/types")
public class TypeController {
    private final TypeService typeService;

    @GetMapping
    public ResponseEntity<?> getTypes() {
        try {
            List<Type> types = typeService.getTypes();
            return new ResponseEntity<>(types, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> addType(@RequestBody Type type) {
        try {
            Type newType = typeService.addType(type);
            return new ResponseEntity<>(newType, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{typeId}")
    public ResponseEntity<?> deleteType(@PathVariable Long typeId) {
        try {
            typeService.deleteTypeById(typeId);
            return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
