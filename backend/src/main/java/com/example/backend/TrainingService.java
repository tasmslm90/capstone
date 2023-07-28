package com.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingService {
    private final TrainingRepository trainingRepository;

    public List<Training> getAllTrainings(){return this.trainingRepository.findAll();}

}
