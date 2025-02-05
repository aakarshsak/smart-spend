package com.zoro.smart_spend.user_profile.services;

import com.zoro.smart_spend.user_profile.repositories.TokenRepository;
import com.zoro.smart_spend.user_profile.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;


    @Autowired
    public AuthServiceImpl(PasswordEncoder passwordEncoder, JwtService jwtService, UserService userService, UserDetailsService userDetailsService, AuthenticationManager authenticationManager, TokenRepository tokenRepository) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public AuthResponse register(RegisterRequest payload) {
        User user = User.builder()
                .username(payload.getUsername())
                .password(passwordEncoder.encode(payload.getPassword()))
                .phone(payload.getPhone())
                .createAt(new Date(System.currentTimeMillis()))
                .updatedAt(new Date(System.currentTimeMillis()))
                .role(Role.USER)
                .build();

        User userSaved = userService.addNewUser(user);
        String token = jwtService.generateToken(user);

        revokeAllUserTokens(userSaved);
        saveUserToken(userSaved, token);

        return AuthResponse.builder().token(token).build();
    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false).build();

        tokenRepository.saveAndFlush(token);
    }

    @Override
    public AuthResponse login(LoginRequest payload) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(payload.getUsername(), payload.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(payload.getUsername());

        Token existingToken = tokenRepository.findByUserAndRevokedFalseAndExpiredFalse((User) userDetails).orElse(null);
        //Token existingToken = listOfExistingTokens.stream().filter(t -> !t.isExpired() && !t.isRevoked()).findFirst().orElse(null);
        if(existingToken!=null) {
            try {
                boolean validToken = jwtService.isTokenValid(existingToken.getToken(), userDetails);
                return AuthResponse.builder().token(existingToken.getToken()).build();
            } catch(Exception e) {
                System.out.println(e);
            }
        }

        String token = jwtService.generateToken((User) userDetails);

        revokeAllUserTokens((User) userDetails);
        saveUserToken((User) userDetails, token);

        return AuthResponse.builder().token(token).build();
    }


    private void revokeAllUserTokens(User user) {

        List<Token> tokens = tokenRepository.findTokenByUser(user);
        for(Token token: tokens) {
            token.setRevoked(true);
            token.setExpired(true);
        }
    }
}
