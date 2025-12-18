package com.cred.expense.service;

import com.cred.expense.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User createUser(User user);
    User getUser(Long id);
    List<User> getAllUsers();
}
