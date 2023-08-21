import {Training} from "./Training.tsx";
import MyCalendar from "./MyCalender.tsx";
import {useNavigate} from "react-router-dom";
import {UserData} from "./UserData.tsx";
import TrainingCard from "./TrainingCard.tsx";


type Props = {

    editedTraining: (editedTraining: Training) => void
    trainings: Training[],
    user?: UserData,
    fetchTrainings: () => Promise<void>

}
function HomePage(props: Props) {

    const navigate = useNavigate();
    const handleGoToPlayerHomepage = () => {

        navigate("/player-homepage");
    };
    return (
        <>
            <MyCalendar fetchTrainings={props.fetchTrainings}></MyCalendar>
            <div className={"div20"}>
                <h3>Training Days</h3>
                {props.trainings.map((training) => (
                    <TrainingCard training={training} onDeleteTraining={props.fetchTrainings}
                                  user={props.user} editedTraining={props.editedTraining}/>
                ))}
            </div>
            <div className="button-group">
                <button className="player-homepage-button" onClick={handleGoToPlayerHomepage}>
                    Home
                </button>
            </div>
        </>
    );
}

export default HomePage;