package com.cred.expense.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "expense_group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


    private String name;

    @ManyToMany
    private List<User> members = new ArrayList<>();
}
