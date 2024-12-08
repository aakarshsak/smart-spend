package com.zoro.smart_spend.user_profile;

public interface AuthService {

    public AuthResponse register(RegisterRequest payload);

    public AuthResponse login(LoginRequest payload);
}
