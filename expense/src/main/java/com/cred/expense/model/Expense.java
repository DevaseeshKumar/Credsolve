package com.cred.expense.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private SplitType splitType;

    @ManyToOne
    private User paidBy;

    @ManyToOne
    private Group group;

    private LocalDateTime createdAt;
}
