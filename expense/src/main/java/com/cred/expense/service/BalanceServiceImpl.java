package com.cred.expense.service;

import com.cred.expense.model.Balance;
import com.cred.expense.model.SettlementHistory;
import com.cred.expense.repository.BalanceRepository;
import com.cred.expense.repository.SettlementHistoryRepository;
import com.cred.expense.service.BalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class BalanceServiceImpl implements BalanceService {

    private final BalanceRepository balanceRepository;
    private final SettlementHistoryRepository settlementHistoryRepository;

    @Override
    public void settle(Long fromUserId, Long toUserId, Long groupId) {

        Balance balance = balanceRepository
                .findByFromUserIdAndToUserIdAndGroupId(fromUserId, toUserId, groupId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "No pending balance to settle"
                ));

        SettlementHistory history = new SettlementHistory();
        history.setFromUser(balance.getFromUser());
        history.setToUser(balance.getToUser());
        history.setGroup(balance.getGroup());
        history.setAmount(balance.getAmount());

        settlementHistoryRepository.save(history);
        balanceRepository.delete(balance);
    }
}
