package com.zoro.smart_spend.user_profile.services;

import com.zoro.smart_spend.user_profile.models.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User addNewUser(User user);
}
