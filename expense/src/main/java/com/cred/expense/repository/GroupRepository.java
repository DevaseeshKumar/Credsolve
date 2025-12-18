package com.cred.expense.repository;

import com.cred.expense.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
