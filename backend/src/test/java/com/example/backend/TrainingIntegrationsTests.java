package com.example.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
 class TrainingIntegrationsTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TrainingRepository trainingRepository;

    @Autowired
    TrainingService trainingService;

    @Test
    @DirtiesContext
    @WithMockUser
    void test_getTraining() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/training")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void test_addTraining() throws Exception {
        String requestBody = """
                {"date":"22.08.2023","art":"Taktik"}
                """;
        ResultActions resultActions = mockMvc.perform(post("/api/training")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
                );

        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.date").value("22.08.2023"));
        resultActions.andExpect(jsonPath("$.art").value("Taktik"));
    }
    @Test
    @DirtiesContext
    @WithMockUser
    void test_deleteTraining() throws Exception {
       Training newTraining = new Training("1","01.01.2023", "Handball");
        trainingRepository.save(newTraining);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/training/1")
                .with(csrf()))
                .andExpect(status().isOk());

    }
    @Test
    @DirtiesContext
    @WithMockUser
    void testGetCurrentUserWithSecurityContext() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/users/me")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }
    @Test
    @DirtiesContext
    @WithMockUser
    void testUpdateTraining() throws Exception {

        Training newTraining = new Training("1", "02.02.2222","Handball");
        trainingRepository.save(newTraining);

        ObjectMapper objectMapper = new ObjectMapper();

        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/training/{id}", "1")
                                .with(csrf())
                                .content(objectMapper.writeValueAsBytes(new Training("1", "02.02.2222","Tennis")))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    {"id": "1","date":"02.02.2222","art": "Tennis" }
                    """));
    }
}

