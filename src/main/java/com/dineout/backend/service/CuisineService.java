package com.dineout.backend.service;


import com.dineout.backend.entity.Cuisine;
import com.dineout.backend.repository.CuisineRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CuisineService {
    private final CuisineRepository cuisineRepository;

    public List<Cuisine> getCuisines() {
        return cuisineRepository.findAll();
    }

    public Cuisine addCuisine(Cuisine cuisine) {
        return cuisineRepository.save(cuisine);
    }

    public void deleteCuisineById(Long id) {
        cuisineRepository.deleteById(id);
    }

    public Cuisine getCuisineById(Long id) {
        return cuisineRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cuisine not found"));
    }
}
