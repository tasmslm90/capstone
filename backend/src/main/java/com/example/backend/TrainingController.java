package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/training")
@RequiredArgsConstructor
public class TrainingController {
    private final TrainingService trainingService;

    @GetMapping
    public List<Training> getAllTrainings(){
        return this.trainingService.getAllTrainings();
    }

    @PostMapping
    public Training addTraining(@RequestBody TrainingWithoutId trainingWithoutId ){
        TrainingWithoutId training = new TrainingWithoutId();
        training.setDate(trainingWithoutId.getDate());
        training.setTime(trainingWithoutId.getTime());
        Training savedTraining = trainingService.addTraining(training);
        return savedTraining;
    }

}

