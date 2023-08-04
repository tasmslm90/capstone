package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Training savedTraining = trainingService.addTraining(training);
        return savedTraining;
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Training> updateTraining(@PathVariable String id, @RequestBody Training updatedTraining) {
//        try {
//            Training training = new Training();
//            training.setId(id);
//            training.setDate(updatedTraining.getDate());
//            training.setTime(updatedTraining.getTime());
//            Training updatedTrainingObj = trainingService.updateTraining(training,id);
//            return ResponseEntity.ok(updatedTrainingObj);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
@PutMapping("/{id}")
public ResponseEntity<Training> updateTraining(@PathVariable String id, @RequestBody Training updatedTraining) {
    try {
        Training training = trainingService.updateTraining(updatedTraining,id);
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
    public void deleteAnimal(@PathVariable String id) {
        trainingService.deleteTraining(id);
    }
}

