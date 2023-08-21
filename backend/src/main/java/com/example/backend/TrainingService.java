package com.example.backend;

import com.example.backend.security.MongoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        training.setStatus(trainingWithoutId.getStatus());
        trainingRepository.save(training);
        return training;
    }
    public Training updateTraining(Training training) throws Exception {
        Training updatedTraining = trainingRepository.findById(training.getId()).orElseThrow(() -> new Exception("training nihct vorhanden"));
        updatedTraining.setDate(training.getDate());
        updatedTraining.setArt(training.getArt());
        updatedTraining.setStatus(training.getStatus());
        return trainingRepository.save(updatedTraining);
    }

    public void deleteTraining(String id) {
        trainingRepository.deleteById(id);
    }
}


/*
<tr key={props.training.id}>
<td>{new Date(props.training.date).toLocaleDateString()}</td>
<td>{new Date(props.training.date).toLocaleTimeString().slice(0, 5)}</td>
<td>{props.training.art}</td>
<td>{props.user?.name}</td>
<td>{props.training.status}</td>
<td> <button className="edit-button" onClick={() => setIsEdit(!isEdit)}>🖊️
</button></td>
<td> <button className="delete-button" onClick={() => handleDeleteTraining(props.training.id)}>🗑️
</button></td>

</tr>

--------------------------
 <>
            <MyCalendar fetchTrainings={props.fetchTrainings}></MyCalendar>

                {props.trainings.map((training) => (
                    <TrainingCard training={training} onDeleteTraining={props.fetchTrainings}
                                  user={props.user} editedTraining={props.editedTraining}/>
                ))}

            <div className="button-group">
                <button className="player-homepage-button" onClick={handleGoToPlayerHomepage}>
                    Home
                </button>
            </div>
        </>


*/
