package com.cred.expense.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cred.expense.model.Balance;
import com.cred.expense.model.User;
import com.cred.expense.repository.BalanceRepository;
import com.cred.expense.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/balances")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceRepository balanceRepository;
    private final UserRepository userRepository;

    /**
     * Fetch outstanding balance between two users
     * Example:
     * GET /balances?from=1&to=2
     */
    @GetMapping
    public BigDecimal getBalance(
            @RequestParam Long from,
            @RequestParam Long to
    ) {
        User fromUser = userRepository.findById(from)
                .orElseThrow(() -> new RuntimeException("From user not found"));

        User toUser = userRepository.findById(to)
                .orElseThrow(() -> new RuntimeException("To user not found"));

        return balanceRepository
                .findByFromUserAndToUser(fromUser, toUser)
                .map(Balance::getAmount)
                .orElse(BigDecimal.ZERO);
    }
}
