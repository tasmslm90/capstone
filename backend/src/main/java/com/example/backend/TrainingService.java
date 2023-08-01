package com.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingService {
    private final TrainingRepository trainingRepository;
    private final UuidService uuidService;

    public List<Training> getAllTrainings() {
        return this.trainingRepository.findAll();
    }

    public Training addTraining(TrainingWithoutId trainingWithoutId) {
        String id = uuidService.generateUUID();
        Training training = new Training();
        training.setId(id);
        training.setDate(trainingWithoutId.getDate());
        training.setTime(trainingWithoutId.getTime());
        trainingRepository.save(training);
        return training;
    }
}


