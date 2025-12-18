package com.cred.expense.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


    private String name;
    private String email;
}
