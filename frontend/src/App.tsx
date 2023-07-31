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
        } catch (error) {
            console.error("Fehler beim Abrufen der Trainings:", error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

  return (
    <>


        <MyCalendar></MyCalendar>
       <div style={{width:"25%", flex: 1 ,float:"right"}}>
           <h1>Trainingdays</h1>
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
