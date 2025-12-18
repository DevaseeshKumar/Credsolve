package com.cred.expense.service;

import com.cred.expense.model.Group;

import java.util.List;
import java.util.UUID;

public interface GroupService {
    Group createGroup(Group group);
    Group addUserToGroup(Long groupId, Long userId);
    List<Group> getAllGroups();
}
