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
    public List<Training> getAllTraining(){
        return this.trainingService.getAllTraining();
    }
    @PostMapping
    public Training addTraining(@RequestBody DtoTraining dtoTraining ){
        Training training = trainingService.addTraining(dtoTraining);
        return training;
    }
    @DeleteMapping("/{id}")
    public void deleteAnimal(@PathVariable String id) {
        trainingService.deleteTraining(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Training> editTraining(@RequestBody DtoTraining dtoTraining, @PathVariable String id){
        try{
            Training editedTraining = trainingService.editTraining(dtoTraining,id);
            return ResponseEntity.ok(editedTraining);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

