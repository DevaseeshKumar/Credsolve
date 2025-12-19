package com.cred.expense.controller;

import com.cred.expense.service.ExpenseService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public void add(
            @RequestParam Long groupId,
            @RequestParam double amount,
            @RequestBody List<Long> users,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("USER_ID");
        expenseService.addExpense(userId, groupId, amount, users);
    }
}
