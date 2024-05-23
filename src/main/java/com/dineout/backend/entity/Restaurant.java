package com.dineout.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String serviceHours;
    private String location;
    @ManyToMany
    @JoinTable(name = "restaurant_tag", joinColumns = {
            @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "tag_id", referencedColumnName = "id")
    })
    private List<Tag> tags = new ArrayList<>();
    @ManyToOne
    private Type type;
    @ManyToOne
    private Cuisine cuisine;
    @ElementCollection
    private List<String> images = new ArrayList<>();
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();

    @JsonIgnore
    public Long getAverageRating() {
        if (reviews.isEmpty()) {
            return 5L;
        }

        double sumRatings = 0.0;
        for (Review review : reviews) {
            sumRatings += review.getRating();
        }

        return Math.round(sumRatings / reviews.size());
    }
}
