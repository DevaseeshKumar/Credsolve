package com.cred.expense.repository;

import com.cred.expense.model.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {
}
