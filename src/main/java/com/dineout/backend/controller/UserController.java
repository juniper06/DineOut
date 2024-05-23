package com.dineout.backend.controller;


import com.dineout.backend.entity.Reservation;
import com.dineout.backend.entity.Review;
import com.dineout.backend.entity.User;
import com.dineout.backend.service.ImageService;
import com.dineout.backend.service.ReservationService;
import com.dineout.backend.service.ReviewService;
import com.dineout.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
@Slf4j
public class UserController {
    private final UserService userService;
    private final ImageService imageService;
    private final ReviewService reviewService;
    private final ReservationService reservationService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserByID(@PathVariable Long userId) {
        try {
            User user = userService.getUserById(userId);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{userId}/image")
    public ResponseEntity<?> addImage(@PathVariable Long userId, @RequestParam(name = "image") MultipartFile image) {
        try {
            User user = userService.getUserById(userId);
            imageService.uploadImage(image, user);
            userService.saveUser(user);
            return new ResponseEntity<>("Successfully Uploaded", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{userId}/reviews")
    public ResponseEntity<?> getReviewsByUser(@PathVariable Long userId, @PageableDefault Pageable pageable) {
        try {
            User user = userService.getUserById(userId);
            Page<Review> reviews = reviewService.getReviewsByUser(user, pageable);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{userId}/reservations")
    public ResponseEntity<?> getReservations(@PathVariable Long userId, @PageableDefault Pageable pageable) {
        try {
            User user = userService.getUserById(userId);
            Page<Reservation> reservations = reservationService.getReservationsByUser(user, pageable);
            return new ResponseEntity<>(reservations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
