import {Training} from "./Training.tsx";
import MyCalendar from "./MyCalender.tsx";
import { useNavigate } from "react-router-dom";
import {UserData} from "./UserData.tsx";
import TrainingCard from "./TrainingCard.tsx";


type Props = {
    trainings : Training[],
    user?: UserData,
    fetchTrainings: () => Promise<void>

}

function HomePage({trainings,user,fetchTrainings}: Props,) {

    const navigate = useNavigate();


    const handleGoToPlayerHomepage = () => {

        navigate("/player-homepage");
    };
    return (
        <>
            <MyCalendar fetchTrainings={fetchTrainings} ></MyCalendar>
            <div className={"div20"}>
                <h3>Training Days</h3>
                {trainings.map((training) => (

                    <TrainingCard training={training} onDeleteTraining={fetchTrainings} user={user}/>


                ))}
            </div>
                <div className="button-group">
                    <button className="player-homepage-button" onClick={handleGoToPlayerHomepage}>
                        Go to Player Homepage
                    </button>
                </div>
        </>
    );
}
export default HomePage;