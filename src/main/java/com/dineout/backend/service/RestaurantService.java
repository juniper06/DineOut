package com.dineout.backend.service;


import com.dineout.backend.dto.request.RestaurantRequest;
import com.dineout.backend.dto.response.RestaurantResponse;
import com.dineout.backend.entity.*;
import com.dineout.backend.repository.RestaurantRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurantById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
    }

    public Page<RestaurantResponse> getRestaurants(List<String> tagNames, String cuisineName, String typeName,
                                                   Long rating, String searchQuery,
                                                   Pageable pageable) {
        Specification<Restaurant> spec = withFilters(tagNames, cuisineName, typeName, rating, searchQuery);
        Page<Restaurant> restaurantPage = restaurantRepository.findAll(spec, pageable);
        return restaurantPage.map(RestaurantResponse::new);
    }

    public void deleteRestaurantById(Long restaurantId) {
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    public List<Restaurant> getRestaurantsByTagId(Long tagId) {
        return restaurantRepository.findRestaurantsByTagsId(tagId);
    }

    public Specification<Restaurant> withFilters(List<String> tagNames, String cuisineName, String typeName,
                                                 Long queryRatings, String searchQuery) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (!tagNames.isEmpty()) {
                predicates.add(root.join("tags").get("name").in(tagNames));
            }

            if (cuisineName != null && !cuisineName.isEmpty()) {
                Join<Restaurant, Cuisine> cuisineJoin = root.join("cuisine");
                predicates.add(criteriaBuilder.equal(cuisineJoin.get("name"), cuisineName));
            }

            if (typeName != null && !typeName.isEmpty()) {
                Join<Restaurant, Type> typeJoin = root.join("type");
                predicates.add(criteriaBuilder.equal(typeJoin.get("name"), typeName));
            }

            if (queryRatings != null) {
                Subquery<Double> subquery = query.subquery(Double.class);
                Root<Review> subRoot = subquery.from(Review.class);
                subquery.select(criteriaBuilder.coalesce(criteriaBuilder.avg(subRoot.get("rating")), 5.0))
                        .where(criteriaBuilder.equal(subRoot.get("restaurant"), root));

                Expression<Double> avgRating = subquery.getSelection();
                Expression<Long> roundedAvgRating = criteriaBuilder.function("ROUND", Long.class, avgRating);

                Predicate ratingPredicate = criteriaBuilder.equal(roundedAvgRating, queryRatings);
                predicates.add(ratingPredicate);
            }


            // Search by name or location
            if (searchQuery != null && !searchQuery.isEmpty()) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + searchQuery + "%"),
                        criteriaBuilder.like(root.get("location"), "%" + searchQuery + "%")
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public Restaurant getRandomRestaurant() {
        long count = restaurantRepository.count();
        Random random = new Random();
        int randomIndex = random.nextInt((int) count);
        List<Restaurant> restaurants = restaurantRepository.findAll(PageRequest.of(randomIndex, 1)).getContent();
        return restaurants.isEmpty() ? null : restaurants.get(0);
    }

    public List<Restaurant> getRecommendedRestaurants() {
        List<Restaurant> restaurants = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            restaurants.add(getRandomRestaurant());
        }
        return restaurants;
    }

    public Restaurant updateRestaurant(Restaurant updatedRestaurant, RestaurantRequest restaurantRequest) {

        if (!restaurantRequest.getName().isBlank()) {
            updatedRestaurant.setName(restaurantRequest.getName());
        }
        if (!restaurantRequest.getDescription().isBlank()) {
            updatedRestaurant.setDescription(restaurantRequest.getDescription());
        }
        if (!restaurantRequest.getServiceHours().isBlank()) {
            updatedRestaurant.setServiceHours(restaurantRequest.getServiceHours());
        }
        return saveRestaurant(updatedRestaurant);
    }
}
