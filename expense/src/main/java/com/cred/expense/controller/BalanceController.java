package com.cred.expense.controller;

import com.cred.expense.model.Balance;
import com.cred.expense.repository.BalanceRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/balances")
@RequiredArgsConstructor
public class BalanceController {

    private final BalanceRepository balanceRepository;

    @GetMapping
    public List<Balance> myBalances(HttpSession session) {
        Long userId = (Long) session.getAttribute("USER_ID");

        if (userId == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Not logged in"
            );
        }

        return balanceRepository.findAll().stream()
                .filter(b ->
                        b.getFromUser().getId().equals(userId) ||
                        b.getToUser().getId().equals(userId)
                )
                .toList();
    }
}
