package com.dineout.backend.dto.response;

import com.dineout.backend.entity.Reservation;
import lombok.Data;

import java.util.Date;


@Data
public class ReservationResponse {
    private Long id;
    private Date reservationDate;
    private String reservationTime;
    private String note;
    private Long countPeople;
    private boolean cancelled;
    private RestaurantResponse restaurant;

    public ReservationResponse(Reservation reservation){
        id = reservation.getId();
        reservationDate = reservation.getReservationDate();
        reservationTime = reservation.getReservationTime();
        note = reservation.getNote();
        countPeople = reservation.getCountPeople();
        cancelled = reservation.isCancelled();
    }
}
