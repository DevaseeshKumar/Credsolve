package com.cred.expense.service;

import com.cred.expense.model.User;
import java.math.BigDecimal;

public interface BalanceService {
    void updateBalance(User from, User to, BigDecimal amount);
    void settle(User from, User to, BigDecimal amount);
}
