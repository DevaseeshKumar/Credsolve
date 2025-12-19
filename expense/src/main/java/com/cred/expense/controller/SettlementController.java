package com.cred.expense.controller;

import com.cred.expense.model.SettlementHistory;
import com.cred.expense.repository.SettlementHistoryRepository;
import com.cred.expense.service.BalanceService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/settlements")
@RequiredArgsConstructor
public class SettlementController {

    private final BalanceService balanceService;
    private final SettlementHistoryRepository repo;
    @PostMapping
    public void settle(
            @RequestParam Long toUserId,
            @RequestParam Long groupId,
            HttpSession session
    ) {
        // ✅ Validate request params
        if (groupId == null || toUserId == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "groupId and toUserId are required"
            );
        }

        // ✅ Validate session
        Long fromUserId = (Long) session.getAttribute("USER_ID");
        if (fromUserId == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Not logged in"
            );
        }

        balanceService.settle(fromUserId, toUserId, groupId);
    }
    @GetMapping("/history")
    public List<SettlementHistory> myHistory(HttpSession session) {
        Long userId = (Long) session.getAttribute("USER_ID");
        if (userId == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

        return repo.findByFromUserIdOrToUserId(userId, userId);
    }
}
