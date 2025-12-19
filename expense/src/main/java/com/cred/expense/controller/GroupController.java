package com.cred.expense.controller;

import com.cred.expense.model.Group;
import com.cred.expense.service.GroupService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public Group create(@RequestParam String name, HttpSession session) {
        Long userId = (Long) session.getAttribute("USER_ID");
        return groupService.createGroup(name, userId);
    }

    @GetMapping
    public List<Group> myGroups(HttpSession session) {
        Long userId = (Long) session.getAttribute("USER_ID");
        return groupService.myGroups(userId);
    }

    @PostMapping("/{groupId}/add")
    public void addUser(@PathVariable Long groupId, @RequestParam Long userId) {
        groupService.addUser(groupId, userId);
    }
}
