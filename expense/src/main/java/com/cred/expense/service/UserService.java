package com.cred.expense.service;

import com.cred.expense.dto.LoginRequest;
import com.cred.expense.dto.RegisterRequest;
import com.cred.expense.model.User;

import java.util.List;

public interface UserService {

    User register(RegisterRequest req);

    User login(LoginRequest req);

    User getById(Long id);

    List<User> findAll();
}
