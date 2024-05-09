package com.dineout.backend.service;


import com.dineout.backend.entity.Restaurant;
import com.dineout.backend.entity.Review;
import com.dineout.backend.entity.User;
import com.dineout.backend.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

//    TODO: add some methods for add, edit and delete
    public Review saveReview(Review review){
        return reviewRepository.save(review);
    }

    public Review getReviewById(Long reviewId){
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Tag id: " + reviewId + " not found"));
    }

    public void deleteReview(Long reviewId){
        reviewRepository.deleteById(reviewId);
    }

    public List<Review> getAllReviewsByRestaurant(Restaurant restaurant){
        return reviewRepository.findAllByRestaurant(restaurant);
    }

    public Page<Review> getReviewsByUser(User user, Pageable pageable){
        return reviewRepository.findAllByUserOrderByDate(user, pageable);
    }
}
