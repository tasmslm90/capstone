package com.example.backend.security;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/users")
public class MongoUserController {

    private final MongoUserService mongoUserService;
    public MongoUserController(MongoUserService mongoUserService){
        this.mongoUserService = mongoUserService;
    }
    @GetMapping("me")
    public UserData getUserInfo() {

     return this.mongoUserService.getUserData();

    }

    @PostMapping("/login")
    public UserData login() {
        return this.mongoUserService.getUserData();
    }

    @PostMapping("/logout")
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
