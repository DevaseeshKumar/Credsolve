package com.cred.expense.dto;

import com.cred.expense.model.SplitType;
import com.cred.expense.model.User;
import com.cred.expense.repository.UserRepository;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Getter
public class CreateExpenseRequest {

    private Long groupId;
    private Long paidBy;
    private BigDecimal totalAmount;
    private SplitType splitType;

    // userId -> amount / percentage
    private Map<Long, BigDecimal> splits;

    public Map<User, BigDecimal> resolveUsers(UserRepository repo) {
        Map<User, BigDecimal> result = new HashMap<>();
        splits.forEach((id, value) ->
                result.put(repo.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found")), value)
        );
        return result;
    }
}
