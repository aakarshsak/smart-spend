package com.zoro.smart_spend.user_profile;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, BigInteger> {
    Optional<Token> findByToken(String token);
    List<Token> findTokenByUser(User user);
}
