package com.example.backend.security;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class MongoUserControllerTest {

    @Mock
    private MongoUserService mongoUserService;

    @Mock
    private SecurityContext securityContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        MongoUserController mongoUserController = new MongoUserController(mongoUserService);
        mockMvc = MockMvcBuilders.standaloneSetup(mongoUserController).build();
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    @WithMockUser
    public void testGetUserInfoWithExistingUser() throws Exception {
        String username = "testUser";
        String role = "userRole";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserData userData = new UserData(username, role);
        when(mongoUserService.getUserData()).thenReturn(userData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value(userData.name()))
                .andExpect(jsonPath("$.role").value(role));
    }

    @Test
    @WithMockUser
    public void testGetUserInfoWithNonExistingUser() throws Exception {

        UserData userData = new UserData("anonymousUser", null);
        when(mongoUserService.getUserData()).thenReturn(userData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value(userData.name()))
                .andExpect(jsonPath("$.role").doesNotExist());

    }

    @Test
    @WithMockUser
    void testLoginEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(csrf())
                        .content("username=hans&password=hans1"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testLogoutEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                .with(csrf())
                .content("username=hans&password=hans1"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout").with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
