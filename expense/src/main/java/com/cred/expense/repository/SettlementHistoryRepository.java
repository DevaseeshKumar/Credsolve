package com.cred.expense.repository;

import com.cred.expense.model.SettlementHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettlementHistoryRepository
        extends JpaRepository<SettlementHistory, Long> {

    List<SettlementHistory> findByGroupId(Long groupId);

    List<SettlementHistory> findByFromUserIdOrToUserId(Long fromUserId, Long toUserId);
}
