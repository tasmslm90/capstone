import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {Training} from "./Training.tsx";
function App() {
    const [trainings, setTrainings] = useState<Training[]>([]);

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

  return (
    <>

       <div style={ {flex: 1 }}>
           <h1>Verfügbare Trainings</h1>
           <ul>
               {trainings.map((training) => (
                   <li key={training.id}>
                       {training.datum}
                   </li>
               ))}
           </ul>
       </div>
        </>
  )
}

export default App
