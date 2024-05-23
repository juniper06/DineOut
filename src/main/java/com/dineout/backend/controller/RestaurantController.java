package com.dineout.backend.controller;


import com.dineout.backend.dto.request.RestaurantRequest;
import com.dineout.backend.dto.request.ReviewRequest;
import com.dineout.backend.dto.response.RestaurantResponse;
import com.dineout.backend.entity.*;
import com.dineout.backend.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurants")
@Slf4j
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final TagService tagService;
    private final CuisineService cuisineService;
    private final TypeService typeService;
    private final ImageService imageService;
    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addRestaurant(@RequestParam(name = "images", required = false) List<MultipartFile> images,
                                           @RequestParam("restaurant") String restaurantJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            RestaurantRequest restaurantRequest = objectMapper.readValue(restaurantJson, RestaurantRequest.class);
            List<Tag> tags = tagService.getTagsByIds(restaurantRequest.getTags());
            Cuisine cuisine = cuisineService.getCuisineById(restaurantRequest.getCuisine());
            Type type = typeService.getTypeById(restaurantRequest.getType());
            Restaurant newRestaurant = Restaurant.builder().name(restaurantRequest.getName())
                    .description(restaurantRequest.getDescription())
                    .serviceHours(restaurantRequest.getServiceHours()).tags(tags)
                    .images(new ArrayList<>())
                    .type(type).location(restaurantRequest.getLocation()).cuisine(cuisine).build();
            images.forEach(image -> {
                try {
                    imageService.uploadImage(image);
                    newRestaurant.getImages().add(image.getOriginalFilename());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            restaurantService.saveRestaurant(newRestaurant);
            return new ResponseEntity<>(newRestaurant, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getRestaurants(
            @RequestParam(value = "tags", required = false, defaultValue = "") List<String> tags,
            @RequestParam(value = "cuisine", required = false, defaultValue = "") String cuisine,
            @RequestParam(value = "type", required = false, defaultValue = "") String type,
            @RequestParam(value = "ratings", required = false, defaultValue = "") Long ratings,
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @PageableDefault Pageable pageable) {
        try {
            Page<RestaurantResponse> restaurants = restaurantService.getRestaurants(
                    tags, cuisine, type, ratings, search, pageable);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{restaurantId}")
    public ResponseEntity<?> updateRestaurant(@RequestParam(name = "restaurant") String restaurantJson,
                                              @RequestParam(name = "images", required = false) List<MultipartFile> images,
                                              @PathVariable Long restaurantId) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            RestaurantRequest restaurantRequest = objectMapper.readValue(restaurantJson, RestaurantRequest.class);
            List<Tag> tags = new ArrayList<>();
            for (Long tagId : restaurantRequest.getTags()) {
                Tag tag = tagService.getTagById(tagId);
                tags.add(tag);
            }
            Restaurant updatedRestaurant = restaurantService.getRestaurantById(restaurantId);
            updatedRestaurant.setTags(tags);
            if (images != null) {
                updatedRestaurant.getImages().forEach(image -> {
                    try {
                        imageService.deleteFile(image);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
                updatedRestaurant.getImages().clear();
                images.forEach(image -> {
                    try {
                        imageService.uploadImage(image);
                        updatedRestaurant.getImages().add(image.getOriginalFilename());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
            }
            Restaurant restaurant = restaurantService.updateRestaurant(updatedRestaurant, restaurantRequest);
            RestaurantResponse response = new RestaurantResponse(restaurant);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<?> getRestaurant(@PathVariable Long restaurantId) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            return new ResponseEntity<>(new RestaurantResponse(restaurant), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable Long restaurantId) {
        try {
            restaurantService.deleteRestaurantById(restaurantId);
            return new ResponseEntity<>(Map.of("message", "Successfully deleted"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{restaurantId}/tags")
    public ResponseEntity<?> getTagsByRestaurantId(@PathVariable Long restaurantId) {
        try {
            List<Tag> tags = tagService.getTagsByRestaurantId(restaurantId);
            return new ResponseEntity<>(tags, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{restaurantId}/images")
    public ResponseEntity<?> addImage(@PathVariable Long restaurantId,
                                      @RequestParam(name = "image") MultipartFile image) {
        try {
            imageService.uploadImage(image);
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            restaurant.getImages().add(image.getOriginalFilename());
            restaurantService.saveRestaurant(restaurant);
            return new ResponseEntity<>("Successfully Uploaded", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{restaurantId}/reviews")
    public ResponseEntity<?> addReview(@PathVariable Long restaurantId, @RequestBody ReviewRequest reviewRequest) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            User user = userService.getUserById(reviewRequest.getUserId());
            Review review = Review.builder().rating(reviewRequest.getRating()).comment(reviewRequest.getComment())
                    .date(new Date())
                    .restaurant(restaurant).user(user)
                    .build();
            Review newReview = reviewService.saveReview(review);
            return new ResponseEntity<>(newReview, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{restaurantId}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable Long restaurantId) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            List<Review> reviews = reviewService.getAllReviewsByRestaurant(restaurant);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomRestaurant() {
        try {
            Restaurant restaurant = restaurantService.getRandomRestaurant();
            RestaurantResponse response = new RestaurantResponse(restaurant);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommendedRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantService.getRecommendedRestaurants();
            List<RestaurantResponse> response = restaurants.stream().map(RestaurantResponse::new).toList();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
