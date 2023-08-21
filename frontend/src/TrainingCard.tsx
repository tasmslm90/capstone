import {useState} from 'react';
import {Training} from "./Training.tsx";
import EditForm from "./EditForm.tsx";
import axios from "axios";
import {UserData} from "./UserData.tsx";

type Props = {
    editedTraining: (editedTraining: Training) => void
    training: Training
    onDeleteTraining: () => Promise<void>
    user?: UserData
}
export default function TrainingCard(props: Props) {


    const [isEdit, setIsEdit] = useState<boolean>(false)


    const handleDeleteTraining = (id: string) => {
        axios.delete(`/api/training/${id}`)
            .then((response) => {
                console.log('Training wurde erfolgreich gelöscht:', response.data);
                props.onDeleteTraining();
            })
            .catch((error) => {
                console.error('Fehler beim Löschen des Trainings:', error);
            });
    };
    return (
        <div key={props.training.id} className="training-item">
            {!isEdit ? <div className="training-container">
                <div className="training-info">
                    <label>Datum : </label>
                    <span>{new Date(props.training.date).toLocaleDateString()}</span>
                </div>
                <div className="training-info">
                    <label>Uhrzeit : </label>
                    <span>{new Date(props.training.date).toLocaleTimeString().slice(0, 5)}</span>
                </div>
                <div className="training-info">
                    <label>Art : </label>
                    <span>{props.training.art}</span>
                </div>
                <div className="training-info">
                    <label>Status : </label>
                    <span>{props.training.status}</span>
                </div>
                <div className="trainer-info">
                    <label>Trainer : </label>
                    <span>{props.user?.name}</span>
                </div>

            </div> : <EditForm training={props.training} editedTraining={props.editedTraining}/>}

            <div className="button-group">
                <button className="edit-button" onClick={() => setIsEdit(!isEdit)}>🖊️
                </button>
                <button className="delete-button" onClick={() => handleDeleteTraining(props.training.id)}>🗑️
                </button>
            </div>
        </div>
    );
}
