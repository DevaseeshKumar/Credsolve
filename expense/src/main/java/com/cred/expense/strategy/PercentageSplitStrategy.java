package com.cred.expense.strategy;

import com.cred.expense.model.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Component("PERCENTAGE")
public class PercentageSplitStrategy implements SplitStrategy {

    @Override
    public Map<User, BigDecimal> calculateSplits(
            BigDecimal total,
            Map<User, BigDecimal> input
    ) {
        BigDecimal percentSum = input.values()
                .stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (percentSum.compareTo(BigDecimal.valueOf(100)) != 0) {
            throw new RuntimeException("Percentage must sum to 100");
        }

        Map<User, BigDecimal> result = new HashMap<>();
        input.forEach((u, p) ->
                result.put(u, total.multiply(p).divide(BigDecimal.valueOf(100)))
        );
        return result;
    }
}
