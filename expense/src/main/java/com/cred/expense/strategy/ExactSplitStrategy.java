package com.cred.expense.strategy;

import com.cred.expense.model.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;

@Component("EXACT")
public class ExactSplitStrategy implements SplitStrategy {

    @Override
    public Map<User, BigDecimal> calculateSplits(
            BigDecimal total,
            Map<User, BigDecimal> input
    ) {
        BigDecimal sum = input.values()
                .stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (sum.compareTo(total) != 0) {
            throw new RuntimeException("Exact split does not match total");
        }
        return input;
    }
}
