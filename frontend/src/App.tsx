import {useEffect,  useState} from 'react'
import './App.css'
import axios from "axios";
import {Training} from "./Training.tsx";
import MyCalendar from "./MyCalender.tsx";

function App() {
    const [trainings, setTrainings] = useState<Training[]>([]);

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
    const handleDeleteTraining = (id: string) => {
        axios.delete(`/api/training/${id}`)
            .then((response) => {
                console.log('Training wurde erfolgreich gelöscht:', response.data);
                fetchTrainings();
            })
            .catch((error) => {
                console.error('Fehler beim Löschen des Trainings:', error);
            });
    };
    const handleEditTraining = (id: string) => {
        const editedTraining = trainings.find((training: Training) => training.id === id);
        if (editedTraining) {

            editedTraining.date = new Date(editedTraining.date).toLocaleDateString();
                console.log(editedTraining.date)
            axios.put(`/api/training/${id}`, editedTraining)
                .then(response => {
                    console.log('Training wurde bearbeitet:', response.data);
                    fetchTrainings();
                })
                .catch(error => {
                    console.error('Fehler beim Bearbeiten des Trainings:', error);
                });
        }
 };
    return (
        <>

            <MyCalendar fetchTrainings={fetchTrainings} ></MyCalendar>

            <div className={"div20"}>
                <h2>Training Days</h2>
                {trainings.map((training) => (
                    <div key={training.id} className="training-item">
                        <div className="training-container">
                            <div className="training-info">
                                <label>Datum:</label>
                                <span>{new Date(training.date).toLocaleDateString()}</span>
                            </div>
                            <div className="training-info">
                                <label>Uhrzeit:</label>
                                <span>{new Date(training.date).toLocaleTimeString().slice(0, 5)}</span>
                            </div>
                            <div className="training-info">
                                <label>Art:</label>
                                <span>{training.art}</span>
                            </div>
                            <div className="button-group">
                                <button className="edit-button" onClick={() => handleEditTraining(training.id)}>🖊️
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteTraining(training.id)}>🗑️
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default App
