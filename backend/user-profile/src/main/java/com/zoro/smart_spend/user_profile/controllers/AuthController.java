package com.zoro.smart_spend.user_profile.controllers;


import com.zoro.smart_spend.user_profile.models.AuthResponse;
import com.zoro.smart_spend.user_profile.models.LoginRequest;
import com.zoro.smart_spend.user_profile.models.RegisterRequest;
import com.zoro.smart_spend.user_profile.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerEntity) {

        AuthResponse authResponse = authService.register(registerEntity);
        return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
    }
}
