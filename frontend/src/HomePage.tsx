import {Training} from "./Training.tsx";
import axios from "axios";
import MyCalendar from "./MyCalender.tsx";
import LogoutButton from "./LogoutButton.tsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    trainings : Training[],
    user?: string,
    fetchTrainings: () => Promise<void>


}

function HomePage({trainings,user,fetchTrainings}: Props,) {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
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
        id= "s"
        return id
    };

    const handleGoToPlayerHomepage = () => {

        navigate("/player-homepage");
    };


    console.log("Rendering component. isLoggedIn:", isLoggedIn);
    return (
        <>
            <MyCalendar fetchTrainings={fetchTrainings} ></MyCalendar>
            <div className={"div20"}>
                <h3>Training Days</h3>
                {trainings.map((training) => (
                    <div key={training.id} className="training-item">
                        <div className="training-container">
                            <div className="training-info">
                                <label>Datum : </label>
                                <span>{new Date(training.date).toLocaleDateString()}</span>
                            </div>
                            <div className="training-info">
                                <label>Uhrzeit : </label>
                                <span>{new Date(training.date).toLocaleTimeString().slice(0, 5)}</span>
                            </div>
                            <div className="training-info">
                                <label>Art : </label>
                                <span>{training.art}</span>
                            </div>
                            <div className="trainer-info">
                                <label>Trainer : </label>
                                <span>{user}</span>
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
                <div className="button-group">
                    <LogoutButton onLogoutSuccess={handleLogoutSuccess} />
                    <button className="player-homepage-button" onClick={handleGoToPlayerHomepage}>
                        Go to Player Homepage
                    </button>
                </div>
        </>
    );
}

export default HomePage;