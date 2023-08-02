package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training")
@RequiredArgsConstructor
public class TrainingController {

    private final TrainingService trainingService;

    @GetMapping
    public List<Training> getAllTrainings() {
        return this.trainingService.getAllTrainings();
    }

    @PostMapping
    public Training addTraining(@RequestBody TrainingWithoutId trainingWithoutId) {

        TrainingWithoutId training = new TrainingWithoutId();
        training.setDate(trainingWithoutId.getDate());
        training.setTime(trainingWithoutId.getTime());
        Training savedTraining = trainingService.addTraining(training);
        return savedTraining;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Training> updateTraining(@PathVariable String id, @RequestBody Training updatedTraining) {
        try {
            Training training = new Training();
            training.setId(id);
            training.setDate(updatedTraining.getDate());
            training.setTime(updatedTraining.getTime());
            Training updatedTrainingObj = trainingService.updateTraining(training,id);
            return ResponseEntity.ok(updatedTrainingObj);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteAnimal(@PathVariable String id) {
        trainingService.deleteTraining(id);
    }
}

