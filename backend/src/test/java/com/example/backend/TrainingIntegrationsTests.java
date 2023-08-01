package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class TrainingIntegrationsTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    TrainingRepository trainingRepository;

    @Autowired
    TrainingService trainingService;

    @Test
    @DirtiesContext
    void test_getTraining() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/training"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    void test_addTraining() throws Exception {
        String requestBody = """
                {"id": "12","date":"22.08.2023","time":"18:30"}
                """;
        ResultActions resultActions = mockMvc.perform(post("/api/training")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody));
        resultActions.andExpect(status().isOk());
        resultActions.andExpect(jsonPath("$.date").value("22.08.2023"));
        resultActions.andExpect(jsonPath("$.time").value("18:30"));
    }
}
