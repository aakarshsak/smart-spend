package com.zoro.smart_spend.user_profile.services;

import com.zoro.smart_spend.user_profile.models.AuthResponse;
import com.zoro.smart_spend.user_profile.models.LoginRequest;
import com.zoro.smart_spend.user_profile.models.RegisterRequest;

public interface AuthService {

    public AuthResponse register(RegisterRequest payload);

    public AuthResponse login(LoginRequest payload);
}
