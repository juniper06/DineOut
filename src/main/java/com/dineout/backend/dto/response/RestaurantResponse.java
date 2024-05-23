package com.dineout.backend.dto.response;


import com.dineout.backend.entity.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RestaurantResponse {
    private Long id;
    private String name;
    private String description;
    private String serviceHours;
    private String address;
    private List<Tag> tags;
    private Type type;
    private Cuisine cuisine;
    private List<String> images;
    private Long ratings;

    public RestaurantResponse(Restaurant restaurant){
        id = restaurant.getId();
        name = restaurant.getName();
        description = restaurant.getDescription();
        serviceHours = restaurant.getServiceHours();
        address = restaurant.getLocation();
        tags = restaurant.getTags();
        type = restaurant.getType();
        cuisine = restaurant.getCuisine();
        images = restaurant.getImages();
        ratings = restaurant.getAverageRating() == 0 ? 5 : restaurant.getAverageRating() ;
    }
}
