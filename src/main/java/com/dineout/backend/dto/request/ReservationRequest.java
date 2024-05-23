package com.dineout.backend.dto.request;


import lombok.Data;

import java.util.Date;

@Data
public class ReservationRequest {
    private Long restaurantId;
    private Long userId;
    private Date reservationDate;
    private String note;
    private String reservationTime;
    private Long countPeople;
}
