import {useEffect, useState} from 'react'
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

    return (
        <>

            <MyCalendar  fetchTrainings={fetchTrainings}></MyCalendar>
            <div className={"div20"}>
                <h2>Training Days</h2>
                {trainings.map((training) => (
                    <div key={training.id} className="training-item">
                        <span>{new Date(training.date).toLocaleString().slice(0,16)} </span>
                        <button className="delete-button" onClick={() => handleDeleteTraining(training.id)}>🗑️</button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default App
