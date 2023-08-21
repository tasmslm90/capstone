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

        <>
                {!isEdit && (
                    <table className="training-table">
                        <thead>
                        <>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Trainer</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </>
                        </thead>
                        <tbody>
                        <tr key={props.training.id}>
                            <td>{new Date(props.training.date).toLocaleDateString()}</td>
                            <td>{new Date(props.training.date).toLocaleTimeString().slice(0, 5)}</td>
                            <td>{props.training.art}</td>
                            <td>{props.user?.name}</td>
                            <td>{props.training.status}</td>
                            <td>
                                <button className="edit-button" onClick={() => setIsEdit(!isEdit)}>
                                    🖊️
                                </button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteTraining(props.training.id)}>
                                    🗑️
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )}
            {isEdit && <EditForm training={props.training} editedTraining={props.editedTraining} />}
        </>
    );
}
