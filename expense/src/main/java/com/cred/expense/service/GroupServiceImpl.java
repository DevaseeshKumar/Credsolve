package com.cred.expense.service;

import com.cred.expense.model.Group;
import com.cred.expense.model.User;
import com.cred.expense.repository.GroupRepository;
import com.cred.expense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepo;
    private final UserRepository userRepo;

    @Override
    public Group createGroup(Group group) {
        return groupRepo.save(group);
    }

    @Override
    public Group addUserToGroup(Long groupId, Long userId) {
        Group g = groupRepo.findById(groupId).orElseThrow();
        User u = userRepo.findById(userId).orElseThrow();
        g.getMembers().add(u);
        return groupRepo.save(g);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepo.findAll();
    }
}
