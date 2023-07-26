package com.example.backend;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingService {
    private final TrainingRepository trainingRepository;
    private final UuidService uuidService;

    public List<Training> getAllTraining(){return this.trainingRepository.findAll();}
    public Training addTraining(DtoTraining dtoTraining){
        String id = uuidService.generateUUID();
        Training training = new Training();
        training.setId(id);
        training.setDatum(dtoTraining.getDatum());
        trainingRepository.save(training);
        return training;
    }
    public void deleteTraining(String id){trainingRepository.deleteById(id);}

    public Training editTraining(DtoTraining dtoTraining, String id)throws Exception{
        Training iseditTraining = trainingRepository.findById(id).orElseThrow(() ->new Exception("training nihct vorhanden"));
        iseditTraining.setDatum(dtoTraining.getDatum());
        return trainingRepository.save(iseditTraining);
    }
}
