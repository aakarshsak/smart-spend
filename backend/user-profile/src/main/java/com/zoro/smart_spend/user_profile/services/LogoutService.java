package com.zoro.smart_spend.user_profile.services;

import com.zoro.smart_spend.user_profile.custome_exceptions.InvalidTokenException;
import com.zoro.smart_spend.user_profile.models.Token;
import com.zoro.smart_spend.user_profile.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    @Autowired
    public LogoutService(TokenRepository tokenRepository, JwtService jwtService) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = request.getHeader("Authorization");
        if(token==null || !token.startsWith("Bearer ")) {
            throw new InvalidTokenException();
        }

        token = token.substring(7);
        Token tokenObj = tokenRepository.findByToken(token).orElse(null);
        if(tokenObj!=null && jwtService.isTokenValid(token, tokenObj.getUser()) && !tokenObj.isRevoked() && !tokenObj.isExpired()) {
            tokenObj.setRevoked(true);
            tokenObj.setExpired(true);
            tokenRepository.saveAndFlush(tokenObj);
            SecurityContextHolder.clearContext();
        } else {
            throw new InvalidTokenException();
        }
    }
}
