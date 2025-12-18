package com.cred.expense.repository;

import com.cred.expense.model.Balance;
import com.cred.expense.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceRepository extends JpaRepository<Balance, Long> {

    Optional<Balance> findByFromUserAndToUser(User fromUser, User toUser);
}
