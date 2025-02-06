package com.zoro.smart_spend.user_profile.services;


import com.zoro.smart_spend.user_profile.models.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String fetchUsername(String token);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateToken(User user, long validity);
}
