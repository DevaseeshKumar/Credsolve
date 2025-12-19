package com.cred.expense.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private double amount;

    @ManyToOne
    private User paidBy;

    @ManyToOne
    private Group group;

    private LocalDateTime createdAt = LocalDateTime.now();
}
