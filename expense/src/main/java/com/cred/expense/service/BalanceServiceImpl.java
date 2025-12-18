package com.cred.expense.service;

import com.cred.expense.model.Balance;
import com.cred.expense.model.User;
import com.cred.expense.repository.BalanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class BalanceServiceImpl implements BalanceService {

    private final BalanceRepository repo;

    @Override
    public void updateBalance(User from, User to, BigDecimal amount) {

        if (from.equals(to)) return;

        repo.findByFromUserAndToUser(from, to).ifPresentOrElse(
                rev -> {
                    BigDecimal net = rev.getAmount().subtract(amount);

                    if (net.compareTo(BigDecimal.ZERO) > 0) {
                        rev.setAmount(net);
                        repo.save(rev);
                    }
                    else if (net.compareTo(BigDecimal.ZERO) < 0) {
                        rev.setFromUser(to);
                        rev.setToUser(from);
                        rev.setAmount(net.abs());
                        repo.save(rev);
                    }
                    else {
                        repo.delete(rev);
                    }
                },
                () -> repo.save(new Balance(null, from, to, amount))
        );
    }

    @Override
    public void settle(User from, User to, BigDecimal amount) {

        Balance b = repo.findByFromUserAndToUser(from, to)
                .orElseThrow(() -> new RuntimeException("No balance found"));

        if (b.getAmount().compareTo(amount) < 0) {
            throw new RuntimeException("Over settlement");
        }

        b.setAmount(b.getAmount().subtract(amount));

        if (b.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            repo.delete(b);
        } else {
            repo.save(b);
        }
    }
}
