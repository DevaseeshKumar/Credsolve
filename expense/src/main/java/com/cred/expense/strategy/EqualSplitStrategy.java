package com.cred.expense.strategy;

import com.cred.expense.model.User;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component("EQUAL")
public class EqualSplitStrategy implements SplitStrategy {

    @Override
    public Map<User, BigDecimal> calculateSplits(
            BigDecimal totalAmount,
            Map<User, BigDecimal> ignoredInput
    ) {
        Set<User> users = ignoredInput.keySet();

        if (users.isEmpty()) {
            throw new IllegalArgumentException("No users found for equal split");
        }

        BigDecimal share = totalAmount.divide(
                BigDecimal.valueOf(users.size()),
                2,
                RoundingMode.HALF_UP
        );

        Map<User, BigDecimal> result = new HashMap<>();
        users.forEach(u -> result.put(u, share));
        return result;
    }
}
