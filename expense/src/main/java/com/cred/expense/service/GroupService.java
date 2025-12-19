package com.cred.expense.service;

import com.cred.expense.model.Group;
import java.util.List;

public interface GroupService {

    Group createGroup(String name, Long userId);

    void addUser(Long groupId, Long userId);

    List<Group> myGroups(Long userId);

}
