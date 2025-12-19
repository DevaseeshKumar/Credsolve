package com.cred.expense.controller;

import com.cred.expense.dto.LoginRequest;
import com.cred.expense.dto.RegisterRequest;
import com.cred.expense.model.User;
import com.cred.expense.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest req) {
        return userService.register(req);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req, HttpSession session) {
        User user = userService.login(req);
        session.setAttribute("USER_ID", user.getId());
        return user;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/me")
    public User me(HttpSession session) {
        Long userId = (Long) session.getAttribute("USER_ID");
        if (userId == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Not logged in"
            );
        }
        return userService.getById(userId);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(HttpSession session) {
        if (session.getAttribute("USER_ID") == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Not logged in"
            );
        }
        return userService.findAll();
    }
}
