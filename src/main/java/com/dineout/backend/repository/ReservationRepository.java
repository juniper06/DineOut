package com.dineout.backend.repository;

import com.dineout.backend.entity.Reservation;
import com.dineout.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.user = :user ORDER BY r.cancelled ASC, r.id")
    Page<Reservation> findAllByUserOrdered(User user, Pageable pageable);
}
