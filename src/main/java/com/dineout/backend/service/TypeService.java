package com.dineout.backend.service;


import com.dineout.backend.entity.Cuisine;
import com.dineout.backend.entity.Type;
import com.dineout.backend.repository.TypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeService {
    private final TypeRepository typeRepository;

    public Type addType(Type type){
        return typeRepository.save(type);
    }

    public List<Type> getTypes() {
        return typeRepository.findAll();
    }

    public void deleteTypeById(Long typeId) {
        typeRepository.deleteById(typeId);
    }

    public Type getTypeById(Long id){
        return typeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Type not found"));
    }
}
