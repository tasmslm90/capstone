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

  return (
    <>

        <MyCalendar fetchTrainings={fetchTrainings}></MyCalendar>

       <div  className={"div20"}>
           <h2>Training Days</h2>
           <ul>
               {trainings.map((training) => (
                   <li key={training.id}>
                       {training.date} : {training.time}
                   </li>
               ))}
           </ul>
       </div>
        </>
  )
}

export default App
