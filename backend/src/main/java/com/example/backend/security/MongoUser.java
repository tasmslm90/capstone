package com.example.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record MongoUser(
        @Id
        String id,
        String role,
        String username,
        String password

) {

}
