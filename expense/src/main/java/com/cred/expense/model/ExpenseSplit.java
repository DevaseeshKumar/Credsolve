package com.cred.expense.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseSplit {

    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


    @ManyToOne
    private Expense expense;

    @ManyToOne
    private User user;

    private BigDecimal amount;
}
