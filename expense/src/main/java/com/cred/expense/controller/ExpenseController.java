package com.cred.expense.controller;

import com.cred.expense.dto.CreateExpenseRequest;
import com.cred.expense.model.Expense;
import com.cred.expense.service.ExpenseService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService service;

    @PostMapping
    public Expense create(@RequestBody CreateExpenseRequest request) {
        return service.createExpense(request);
    }

    @GetMapping("/viewexpenses")
    public List<Expense> viewExpenses() {
        return service.getAllExpenses();
    }
}
