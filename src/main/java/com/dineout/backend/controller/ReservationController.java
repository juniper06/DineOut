package com.dineout.backend.controller;


import com.dineout.backend.dto.request.ReservationRequest;
import com.dineout.backend.entity.Reservation;
import com.dineout.backend.entity.Restaurant;
import com.dineout.backend.entity.User;
import com.dineout.backend.service.ReservationService;
import com.dineout.backend.service.RestaurantService;
import com.dineout.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    private final RestaurantService restaurantService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addReservation(@RequestBody ReservationRequest reservationRequest) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(reservationRequest.getRestaurantId());
            User user = userService.getUserById(reservationRequest.getUserId());
            Reservation reservation = Reservation.builder().reservationDate(reservationRequest.getReservationDate())
                    .user(user).countPeople(reservationRequest.getCountPeople())
                    .reservationTime(reservationRequest.getReservationTime())
                    .note(reservationRequest.getNote()).restaurant(restaurant).build();
            Reservation newReservation = reservationService.addReservation(reservation);
            return new ResponseEntity<>(newReservation, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<?> cancelReservation(@PathVariable Long reservationId) {
        try {
            reservationService.cancelReservation(reservationId);
            return new ResponseEntity<>("Successfully cancelled", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

}
