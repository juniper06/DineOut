package com.dineout.backend.repository;

import com.dineout.backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByRestaurantsId(Long id);
}
