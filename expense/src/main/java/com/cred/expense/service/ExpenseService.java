package com.cred.expense.service;

import com.cred.expense.model.Expense;

import java.util.List;

import com.cred.expense.dto.CreateExpenseRequest;

public interface ExpenseService {
    Expense createExpense(CreateExpenseRequest request);
    List<Expense> getAllExpenses();
}
