import axios from "axios";
import {useEffect, useState} from "react";
import {Training} from "./Training.tsx";

export default function PlayerHomepage() {
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

    return (
        <>
            <div>
                <h1>Your Trainings</h1>
                <ul>
                    {trainings.map((training) => (
                        <li key={training.id}>
                            <p>Date: {new Date(training.date).toLocaleDateString()}</p>
                            <p>Time: {new Date(training.date).toLocaleTimeString().slice(0, 5)}</p>
                            <p>Type: {training.art}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

