package com.dineout.backend.service;


import com.dineout.backend.entity.Reservation;
import com.dineout.backend.entity.User;
import com.dineout.backend.repository.ReservationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Page<Reservation> getReservationsByUser(User user, Pageable pageable) {
        return reservationRepository.findAllByUserOrdered(user, pageable);
    }

    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation ID: " + reservationId + " not found"));
        reservation.setCancelled(true);
        reservationRepository.save(reservation);
    }
}
