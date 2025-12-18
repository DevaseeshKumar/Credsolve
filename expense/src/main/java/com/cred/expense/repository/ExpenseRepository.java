package com.cred.expense.repository;

import com.cred.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
