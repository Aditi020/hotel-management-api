package com.management.hotel.service.interfac;

import com.management.hotel.dto.LoginRequest;
import com.management.hotel.dto.Response;
import com.management.hotel.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
