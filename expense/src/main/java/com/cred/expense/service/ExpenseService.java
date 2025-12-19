package com.cred.expense.service;

import java.util.List;

public interface ExpenseService {

    void addExpense(Long paidById, Long groupId, double amount, List<Long> users);

}
