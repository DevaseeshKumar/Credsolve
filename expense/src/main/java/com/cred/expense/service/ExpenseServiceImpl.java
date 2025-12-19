package com.cred.expense.service;

import com.cred.expense.model.Balance;
import com.cred.expense.model.Group;
import com.cred.expense.model.User;
import com.cred.expense.repository.BalanceRepository;
import com.cred.expense.repository.UserRepository;
import com.cred.expense.service.ExpenseService;
import com.cred.expense.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final BalanceRepository balanceRepo;
    private final UserRepository userRepo;
    private final GroupService groupService;

    @Override
    public void addExpense(Long paidById, Long groupId, double amount, List<Long> users) {

        Group group = groupService.myGroups(paidById).stream()
                .filter(g -> g.getId().equals(groupId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Group not found"));

        double share = amount / users.size();

        User paidBy = userRepo.findById(paidById)
                .orElseThrow(() -> new RuntimeException("Payer not found"));

        for (Long userId : users) {

            if (userId.equals(paidById)) {
                continue;
            }

            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Balance balance = balanceRepo
                    .findByFromUserIdAndToUserIdAndGroupId(userId, paidById, groupId)
                    .orElse(new Balance(
                            null,
                            user,
                            paidBy,
                            group,
                            0.0
                    ));

            balance.setAmount(balance.getAmount() + share);
            balanceRepo.save(balance);
        }
    }
}
