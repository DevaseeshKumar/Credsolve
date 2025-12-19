package com.cred.expense.repository;

import com.cred.expense.model.Balance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BalanceRepository extends JpaRepository<Balance, Long> {

    Optional<Balance> findByFromUserIdAndToUserIdAndGroupId(
            Long fromUserId,
            Long toUserId,
            Long groupId
    );
}
