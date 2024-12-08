package com.zoro.smart_spend.user_profile;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User addNewUser(User user);
}
