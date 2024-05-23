package com.dineout.backend.controller;


import com.dineout.backend.entity.Cuisine;
import com.dineout.backend.entity.Type;
import com.dineout.backend.service.CuisineService;
import com.dineout.backend.service.TypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cuisine")
public class CuisineController {
    private final CuisineService cuisineService;

    @GetMapping
    public ResponseEntity<?> getCuisine(){
        try{
            List<Cuisine> cuisines = cuisineService.getCuisines();
            return new ResponseEntity<>(cuisines, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> addType(@RequestBody Cuisine cuisine){
        try{
            Cuisine newCuisine = cuisineService.addCuisine(cuisine);
            return new ResponseEntity<>(newCuisine, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{cuisineId}")
    public ResponseEntity<?> deleteType(@PathVariable Long cuisineId){
        try{
            cuisineService.deleteCuisineById(cuisineId);
            return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
