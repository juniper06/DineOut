package com.dineout.backend.controller;


import com.dineout.backend.entity.Restaurant;
import com.dineout.backend.entity.Tag;
import com.dineout.backend.service.RestaurantService;
import com.dineout.backend.service.TagService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tags")
public class TagController {
    private final RestaurantService restaurantService;
    private final TagService tagService;

    @GetMapping("/{tagId}/restaurants")
    public ResponseEntity<?> getRestaurantsByTagId(@PathVariable Long tagId) {
        try {
            List<Restaurant> restaurants = restaurantService.getRestaurantsByTagId(tagId);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getTags() {
        try {
            List<Tag> tags = tagService.getTags();
            return new ResponseEntity<>(tags, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> addTag(@RequestBody Tag tag) {
        try {
            Tag newTag = tagService.addTag(tag);
            return new ResponseEntity<>(newTag, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<?> deleteTag(@PathVariable Long tagId) {
        try {
            tagService.deleteTagById(tagId);
            return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

}
