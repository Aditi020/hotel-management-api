package com.management.hotel.service.interfac;

import com.management.hotel.dto.Response;
import com.management.hotel.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
