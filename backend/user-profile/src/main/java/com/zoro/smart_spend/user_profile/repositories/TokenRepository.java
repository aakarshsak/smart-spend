package com.zoro.smart_spend.user_profile.repositories;

import com.zoro.smart_spend.user_profile.models.Token;
import com.zoro.smart_spend.user_profile.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, BigInteger> {
    Optional<Token> findByToken(String token);
    List<Token> findTokenByUser(User user);
    Optional<Token> findByUserAndRevokedFalseAndExpiredFalse(User user);
}
