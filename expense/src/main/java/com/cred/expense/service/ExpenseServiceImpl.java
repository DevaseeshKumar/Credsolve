package com.cred.expense.service;

import com.cred.expense.dto.CreateExpenseRequest;
import com.cred.expense.model.*;
import com.cred.expense.repository.*;
import com.cred.expense.strategy.SplitStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final ExpenseSplitRepository splitRepo;
    private final UserRepository userRepo;
    private final GroupRepository groupRepo;
    private final BalanceService balanceService;

    private final Map<String, SplitStrategy> strategyMap;

    @Override
    public Expense createExpense(CreateExpenseRequest req) {

        Group group = groupRepo.findById(req.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User paidBy = userRepo.findById(req.getPaidBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SplitStrategy strategy = strategyMap.get(req.getSplitType().name());

        if (strategy == null) {
            throw new IllegalArgumentException("Invalid split type");
        }

        Map<User, BigDecimal> splits;

        if (req.getSplitType() == SplitType.EQUAL) {
            splits = strategy.calculateSplits(
                    req.getTotalAmount(),
                    group.getMembers().stream()
                         .collect(Collectors.toMap(u -> u, u -> BigDecimal.ZERO))
            );
        } else {
            splits = strategy.calculateSplits(
                    req.getTotalAmount(),
                    req.resolveUsers(userRepo)
            );
        }

        Expense expense = new Expense(
                null,
                req.getTotalAmount(),
                req.getSplitType(),
                paidBy,
                group,
                LocalDateTime.now()
        );

        expenseRepo.save(expense);

        splits.forEach((user, amount) -> {
            splitRepo.save(new ExpenseSplit(null, expense, user, amount));
            if (!user.equals(paidBy)) {
                balanceService.updateBalance(user, paidBy, amount);
            }
        });

        return expense;
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }
}
