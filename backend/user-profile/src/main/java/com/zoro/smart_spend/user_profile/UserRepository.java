package com.zoro.smart_spend.user_profile;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.math.BigInteger;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, BigInteger> {

    Optional<User> findUserByUsername(String username);
}
