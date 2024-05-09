package com.dineout.backend.repository;

import com.dineout.backend.entity.Restaurant;
import com.dineout.backend.entity.Review;
import com.dineout.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByRestaurant(Restaurant restaurant);

    Page<Review> findAllByUserOrderByDate(User user, Pageable pageable);
}
