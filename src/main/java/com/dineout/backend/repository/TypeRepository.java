package com.dineout.backend.repository;

import com.dineout.backend.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<Type, Long> {
}
