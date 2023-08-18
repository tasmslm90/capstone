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
        training.setArt(trainingWithoutId.getArt());
        Training savedTraining = trainingService.addTraining(training);
        return savedTraining;
    }

@PutMapping("/{id}")
public ResponseEntity<Training> updateTraining(@PathVariable String id, @RequestBody Training updatedTraining) {
    try {
        Training training = trainingService.updateTraining(updatedTraining);
        if (training != null) {
            return ResponseEntity.ok(training);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
    @DeleteMapping("/{id}")
    public void deleteTraining(@PathVariable String id) {
        trainingService.deleteTraining(id);
    }
}

