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
        training.setStatus(trainingWithoutId.getStatus());

        Training savedTraining = trainingService.addTraining(training);
        return savedTraining;
    }

    @PutMapping("{id}")
    public Training updateTraining(@PathVariable String id, @RequestBody Training edittraining) {
        return trainingService.updateTraining(edittraining);
    }


    @DeleteMapping("/{id}")
    public void deleteTraining(@PathVariable String id) {
        trainingService.deleteTraining(id);
    }
}

