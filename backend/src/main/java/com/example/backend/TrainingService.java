package com.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
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
        training.setArt(trainingWithoutId.getArt());
        trainingRepository.save(training);
        return training;
    }
    public Training updateTraining(Training training) throws Exception {
        Training updatedTraining = trainingRepository.findById(training.getId()).orElseThrow(() -> new Exception("training nihct vorhanden"));
        updatedTraining.setDate(training.getDate());
        updatedTraining.setArt(training.getArt());
        return trainingRepository.save(updatedTraining);
    }

    public void deleteTraining(String id) {
        trainingRepository.deleteById(id);
    }
}


