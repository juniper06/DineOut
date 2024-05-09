package com.dineout.backend.controller;


import com.dineout.backend.dto.request.ReviewRequest;
import com.dineout.backend.entity.Review;
import com.dineout.backend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>("Successfully Deleted", HttpStatus.OK);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest){
        try {
            Review review = reviewService.getReviewById(reviewId);
            review.setComment(reviewRequest.getComment());
            review.setRating(reviewRequest.getRating());
            return new ResponseEntity<>(reviewService.saveReview(review), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
