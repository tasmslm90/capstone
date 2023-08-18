package com.example.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MongoUserService {
    private final MongoUserRepository mongoUserRepository;

    public MongoUserService(MongoUserRepository mongoUserRepository){
        this.mongoUserRepository=mongoUserRepository;
    }

    public UserData getUserData(){

        String userName= SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<MongoUser> user = this.mongoUserRepository.findByUsername(userName);

        if(user.isEmpty()){
            return new UserData("anonymousUser", null);
        }

        assert user.isPresent();
        return new UserData(user.get().username(),user.get().role());
    }
}
