package com.example.backend;

import com.example.backend.security.*;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import static org.mockito.Mockito.*;

class TrainingServiceTest {
    TrainingRepository trainingRepository = mock(TrainingRepository.class);
    UuidService uuidService = mock(UuidService.class);
    TrainingService trainingService = new TrainingService(trainingRepository, uuidService);

    @Test
    void test_getAllTraining() {
        when(trainingRepository.findAll()).thenReturn(Arrays.asList(
                new Training("1", "02.08.20023", "Taktik"),
                new Training("2", "04.08.20023", "Kondition")
        ));
        List<Training> actual = trainingService.getAllTrainings();
        List<Training> expected = Arrays.asList(
                new Training("1", "02.08.20023", "Taktik"),
                new Training("2", "04.08.20023", "Kondition")
        );
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGenerateUuid() {
        String mockUuid = "123abc";
        when(uuidService.generateUUID())
                .thenReturn(mockUuid);
        String result = uuidService.generateUUID();
        Assertions.assertEquals(mockUuid, result);
        verify(uuidService, times(1)).generateUUID();

    }

    @Test
    void test_addTraining() {
        TrainingWithoutId trainingWithoutId = new TrainingWithoutId("02.08.1023", "Taktik");
        Training expected = new Training("1111", trainingWithoutId.getDate(), trainingWithoutId.getArt());
        when(uuidService.generateUUID()).thenReturn("1111");
        when(trainingRepository.save(expected)).thenReturn(expected);
        Training actual = trainingService.addTraining(trainingWithoutId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void test_deleteAnimal() {
        trainingService.deleteTraining("1");
        verify(trainingRepository).deleteById("1");
    }

    @Test
    void testUpdateTraining() {
        try {
            Training newTraining = new Training("12", "02.02.2222", "Handball");
            when(trainingRepository.findById("12")).thenReturn(Optional.of(newTraining));
            Training actual = trainingService.updateTraining(newTraining);
            Training expected = new Training("12", "02.02.2222", "Tennis");
            Assertions.assertNotEquals(expected, actual);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

}
