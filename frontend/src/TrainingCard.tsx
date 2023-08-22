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
    const handleEditClick = () => {
        setIsEdit(true);
    };
    const handleSaveEdit = (editedTraining: Training) => {
        props.editedTraining(editedTraining);
        setIsEdit(false);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };
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
        <div className={"card"}>
                {!isEdit && (
                    <table className="training-table">

                        <tbody>
                        <tr key={props.training.id}>
                            <td>{new Date(props.training.date).toLocaleDateString()}</td>
                            <td>{new Date(props.training.date).toLocaleTimeString().slice(0, 5)}</td>
                            <td>{props.training.art}</td>
                            <td>{props.user?.name}</td>
                            <td>{props.training.status}</td>
                            <td>
                                <button className="edit-button" onClick={handleEditClick}>
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
            {isEdit && <EditForm training={props.training}  onSaveEdit={handleSaveEdit}
                                 onCancelEdit={handleCancelEdit} />}
        </div>
</>
    );
}
