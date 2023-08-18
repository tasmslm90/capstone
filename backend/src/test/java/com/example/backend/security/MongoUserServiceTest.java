package com.example.backend.security;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.mockito.Mockito.*;

public class MongoUserServiceTest {

    MongoUserRepository mongoUserRepository = mock(MongoUserRepository.class);
    @Mock
    private SecurityContext securityContext;
    MongoUserService mongoUserService = new MongoUserService(mongoUserRepository);
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mongoUserService = new MongoUserService(mongoUserRepository);
        SecurityContextHolder.setContext(securityContext);
    }
    @Test
    public void testGetUserDataWithExistingUser() {
        String username = "testUser";
        String role = "userRole";
        Authentication authentication = mock(Authentication.class);

        when(authentication.getName()).thenReturn(username);
        when(securityContext.getAuthentication()).thenReturn(authentication);

       MongoUser user = new UserData();
        user.setUsername(username);
        user.setRole(role);
        when(mongoUserRepository.findByUsername(username)).thenReturn(Optional.of(user));

        UserData result = mongoUserService.getUserData();

        verify(mongoUserRepository, times(1)).findByUsername(username);
        Assertions.assertEquals(username, result.getUsername());
        Assertions.assertEquals(role, result.getRole());
    }
}
