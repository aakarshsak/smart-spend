package com.zoro.smart_spend.user_profile.services;


import com.zoro.smart_spend.user_profile.custome_exceptions.InvalidTokenException;
import com.zoro.smart_spend.user_profile.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.signin.key}")
    private String jwtSignInKey;

    public String fetchUsername(String token) {
        return fetchClaim(token, Claims::getSubject);
    }

    private <T> T fetchClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = fetchAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    private Claims fetchAllClaims(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser().verifyWith(getSignInKey()).build().parseSignedClaims(token).getPayload();
        } catch(Exception e) {
            throw new InvalidTokenException();
        }
        return claims;
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSignInKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = fetchUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return fetchExpiration(token).before(new Date(System.currentTimeMillis()));
    }

    private Date fetchExpiration(String token) {
        return fetchClaim(token, Claims::getExpiration);
    }

    public String generateToken(User user, long validity) {
        return generateToken(new HashMap<>(), user, validity);
    }

    private String generateToken(HashMap<String, Object> extraClaims, User user, long validity) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + validity))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
