import {useEffect, useState} from 'react'
import './App.css'
import MyCalendar from "./MyCalendar.tsx";
import axios from "axios";
function App() {
    const [trainings, setTrainings] = useState([]);


    const fetchTrainings = async () => {
        try {
            const response = await axios.get("/api/training");
            setTrainings(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Trainings:", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    if (!Array.isArray(trainings) || trainings.length === 0){
        return "Lade...";
    }
  return (
    <>
        <MyCalendar />
        <h1>Verfügbare Trainings</h1>
        <ul>
            {trainings.map((training) => (
                <li key={training.id}>
                    {training.datum}
                </li>
            ))}
        </ul>
        </>
  )
}

export default App
