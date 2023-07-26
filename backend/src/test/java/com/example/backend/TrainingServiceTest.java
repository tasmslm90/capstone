package com.example.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

public class TrainingServiceTest {
    TrainingRepository trainingRepository = spy(TrainingRepository.class);
    TrainingService trainingService = new TrainingService(trainingRepository);
    @Test
    void test_getAllTraining() {
        when(trainingRepository.findAll()).thenReturn(Arrays.asList(
                new Training("1", "02.08.20023"),
                new Training("2", "04.08.20023")
        ));
        List<Training> actual = trainingService.getAllTraining();
        List<Training> expected = Arrays.asList(
                new Training("1", "02.08.20023"),
                new Training("2", "04.08.20023")
        );
        Assertions.assertEquals(expected, actual);
    }
}
