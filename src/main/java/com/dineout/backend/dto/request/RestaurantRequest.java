package com.dineout.backend.dto.request;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantRequest {
    private String name;
    private String description;
    private String serviceHours;
    private List<Long> tags;
    @NonNull
    private Long cuisine;
    @NonNull
    private Long type;
    private String location;
}
