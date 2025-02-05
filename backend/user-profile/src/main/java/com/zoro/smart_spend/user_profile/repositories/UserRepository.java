package com.zoro.smart_spend.user_profile.repositories;

import com.zoro.smart_spend.user_profile.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, BigInteger> {

    Optional<User> findUserByUsername(String username);
}
