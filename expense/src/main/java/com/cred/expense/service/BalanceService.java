package com.cred.expense.service;

public interface BalanceService {

    void settle(Long fromUserId, Long toUserId, Long groupId);

}
