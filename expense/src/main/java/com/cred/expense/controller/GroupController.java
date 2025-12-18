    package com.cred.expense.controller;

    import com.cred.expense.model.Group;
    import com.cred.expense.service.GroupService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.UUID;

    @RestController
    @RequestMapping("/groups")
    @RequiredArgsConstructor
    public class GroupController {

        private final GroupService groupService;

        @PostMapping
        public Group create(@RequestBody Group group) {
            return groupService.createGroup(group);
        }

        @PostMapping("/{groupId}/add/{userId}")
        public Group addUser(
                @PathVariable Long groupId,
                @PathVariable Long userId
        ) {
            return groupService.addUserToGroup(groupId, userId);
        }

        @GetMapping("/viewgroups")
        public List<Group> viewGroups() {
            return groupService.getAllGroups();
        }   
    }
