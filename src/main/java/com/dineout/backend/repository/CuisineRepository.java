package com.dineout.backend.repository;

import com.dineout.backend.entity.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
}
