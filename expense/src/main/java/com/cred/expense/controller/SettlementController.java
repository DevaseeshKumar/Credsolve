package com.cred.expense.controller;

import com.cred.expense.model.User;
import com.cred.expense.service.BalanceService;
import com.cred.expense.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/settle")
@RequiredArgsConstructor
public class SettlementController {

    private final BalanceService balanceService;
    private final UserService userService;

    @PostMapping
    public void settle(
            @RequestParam Long from,
            @RequestParam Long to,
            @RequestParam BigDecimal amount
    ) {
        User f = userService.getUser(from);
        User t = userService.getUser(to);
        balanceService.settle(f, t, amount);
    }

    
}
