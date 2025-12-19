package com.cred.expense.service;

import com.cred.expense.model.Group;
import com.cred.expense.model.User;
import com.cred.expense.repository.GroupRepository;
import com.cred.expense.repository.UserRepository;
import com.cred.expense.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepo;
    private final UserRepository userRepo;

    @Override
    public Group createGroup(String name, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = new Group();
        group.setName(name);
        group.setCreatedBy(user);
        group.getMembers().add(user);

        return groupRepo.save(group);
    }

    @Override
    public void addUser(Long groupId, Long userId) {

        Group group = groupRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        group.getMembers().add(user);
        groupRepo.save(group);
    }

    @Override
    public List<Group> myGroups(Long userId) {
        return groupRepo.findByMembers_Id(userId);
    }
}
