package com.dineout.backend.dto.response;

import com.dineout.backend.entity.User;
import lombok.Data;

@Data
public class LoginResponse {
    private final String token;
    private final User userDetails;

    public LoginResponse(User user, String token) {
        this.userDetails = user;
        this.token = token;
    }
}
