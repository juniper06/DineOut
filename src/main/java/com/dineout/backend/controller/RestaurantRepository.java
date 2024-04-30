package com.dineout.backend.repository;

import com.dineout.backend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {
    List<Restaurant> findRestaurantsByTagsId(Long tagId);

    List<Restaurant> findTop2ByTypeId(Long typeId);
}
