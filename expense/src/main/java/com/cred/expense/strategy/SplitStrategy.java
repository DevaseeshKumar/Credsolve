package com.cred.expense.strategy;

import com.cred.expense.model.User;
import java.math.BigDecimal;
import java.util.Map;

public interface SplitStrategy {
    Map<User, BigDecimal> calculateSplits(
            BigDecimal total,
            Map<User, BigDecimal> input
    );
}
