package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
        Training training = trainingService.addTraining(trainingWithoutId);
        return training;
    }

}

