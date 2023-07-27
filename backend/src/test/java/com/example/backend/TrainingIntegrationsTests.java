package com.example.backend;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
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
    void test_getTraining() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/training"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        []
                        """));
    }
}
