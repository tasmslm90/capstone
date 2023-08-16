import axios from "axios";
import {useEffect, useState} from "react";
import {Training} from "./Training.tsx";


export default function PlayerHomepage() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [status, setStatus] = useState<string| null>("");
    const fetchTrainings = async () => {
        try {
            const response = await axios.get("/api/training");
            setTrainings(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Fehler beim Abrufen der Trainings:", error);
        }
    };
    useEffect(() => {
        fetchTrainings();
    }, []);

    const toggleStatusPopup = (trainingId: string) => {
        setStatus(status === trainingId ? null : trainingId);
    };
    const change = async (trainingId: string, newStatus: string) => {
        try {
            await axios.put(`/api/training/${trainingId}`, { status: newStatus });
            setStatus(null);
            fetchTrainings();
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Status:", error);
        }
    };
    function changeStatus(editedTraining: Training) {

        axios.put("/api/training/" + editedTraining.id, editedTraining)
            .then((response) =>
                setTrainings((prevState) => prevState.map((training) => {
                    if (training.id === editedTraining.id) {
                        return response.data;
                    } else {
                        return training;
                    }
                }))
            )
    }


    return (
        <>
            <div className="training-container">
                <h1>Your Trainings</h1>
                <table className="training-table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trainings.map((training) => (
                        <tr key={training.id}>
                            <td>{new Date(training.date).toLocaleDateString()}</td>
                            <td>{new Date(training.date).toLocaleTimeString().slice(0, 5)}</td>
                            <td>{training.art}</td>
                            <td className="status-cell">
                                    <span className="status-btn" onClick={() => toggleStatusPopup(training.id)}>
                                        Open
                                    </span>
                                {status === training.id && (
                                    <div className="status-popup">
                                        <button className="action-btn" onClick={() => changeStatus(training.id, 'accepted')}>
                                            ✔
                                        </button>
                                        <button className="action-btn" onClick={() => changeStatus(training.id, 'rejected')}>
                                            ✘
                                        </button>
                                        <button className="action-btn" onClick={() => setStatus(null)}>
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

