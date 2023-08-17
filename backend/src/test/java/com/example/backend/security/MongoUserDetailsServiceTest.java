package com.example.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MongoUserDetailsServiceTest {
    private final MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository);


    @Test
    void getUserByUsername() {

        MongoUser expected = new MongoUser("abc", "PLAYER", "hans", "hans1");
        String username = "hans";

        when(mongoUserRepository.findByUsername(username)).thenReturn(Optional.of(expected));
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("hans");

        assertEquals(expected.username(), actual.getUsername());
        verify(mongoUserRepository).findByUsername(username);
    }
}