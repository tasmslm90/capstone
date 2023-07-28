package com.example.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;

public class TrainingServiceTest {
    TrainingRepository trainingRepository = mock(TrainingRepository.class);
    UuidService uuidService = mock(UuidService.class);
    TrainingService trainingService = new TrainingService(trainingRepository, uuidService);

    @Test
    void test_getAllTraining() {
        when(trainingRepository.findAll()).thenReturn(Arrays.asList(
                new Training("1", "02.08.20023"),
                new Training("2", "04.08.20023")
        ));
        List<Training> actual = trainingService.getAllTrainings();
        List<Training> expected = Arrays.asList(
                new Training("1", "02.08.20023"),
                new Training("2", "04.08.20023")
        );
        Assertions.assertEquals(expected, actual);
    }
    @Test
    void testGenerateUuid(){
        String mockUuid = "123abc";
        when(uuidService.generateUUID())
                .thenReturn(mockUuid);
        String result = uuidService.generateUUID();
        Assertions.assertEquals(mockUuid,result);
        verify(uuidService, times(1)).generateUUID();

    }
    @Test
    void test_addTraining(){
        TrainingWithoutId trainingWithoutId = new TrainingWithoutId("02.08.1023");
        Training expected = new Training("1111",trainingWithoutId.getDatum());
        when(uuidService.generateUUID()).thenReturn("1111");
        when(trainingRepository.save(expected)).thenReturn(expected);
        Training actual = trainingService.addTraining(trainingWithoutId);
        Assertions.assertEquals(expected,actual);
    }
}
