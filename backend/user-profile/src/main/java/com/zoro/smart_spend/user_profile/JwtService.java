package com.zoro.smart_spend.user_profile;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

public interface JwtService {
    String fetchUsername(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateToken(User user);
}
