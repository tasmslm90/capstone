import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
//import deLocale from '@fullcalendar/core/locales/de'; deutsch
import {ChangeEvent, useState} from "react";
import axios from "axios";
function MyCalendar({ fetchTrainings}: { fetchTrainings: () => void}) {
    const [clickedDates, setClickedDates] = useState<Date[]>([]);
    const [dateSelectionDisabled, setDateSelectionDisabled] = useState(false);
    const [selectedArt, setSelectedArt] = useState("");
    const availableArtOptions = ["Fußball", "Basketball", "Handball", "Tennis"];


    const handleDayClick = (dateClickInfo: any) => {
        const clickedDateStr = dateClickInfo.date;
        if (!dateSelectionDisabled) {
            setClickedDates((prevDates) => [...prevDates, clickedDateStr]);
            setDateSelectionDisabled(true);
        }
    };
    const renderDayButton = (info: { dayNumberText: string, date: Date }) => {
        return (
            <button className={"button"} onClick={() => handleDayClick(info)}>
                {info.dayNumberText}
            </button>
        );
    };
    const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const hoursandmin = event.target.value.split(":");
        const hours = Number(hoursandmin[0]);
        const min = Number(hoursandmin[1]);
        const date = clickedDates[clickedDates.length-1]
        date.setHours(hours,min);
        setClickedDates((prevDates) =>{
            prevDates[prevDates.length-1]=date;
            return prevDates
        })
    };
    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let h = 16; h < 21; h++) {
            for (let m = 0; m < 60; m += 15) {
                const hour = h.toString().padStart(2, "0");
                const minute = m.toString().padStart(2, "0");
                timeOptions.push(`${hour}:${minute}`);
            }
        }
        return timeOptions;
    };
    const handleAddTraining = () => {
        const newTraining = {
            date: clickedDates[clickedDates.length-1],
            art: selectedArt,
        };

        axios.post('/api/training', newTraining)
            .then((response) => {
                console.log('Training wurde erfolgreich gespeichert:', response.data);
                fetchTrainings();
                setDateSelectionDisabled(false);
                setClickedDates([]);
                setSelectedArt('');


            })
            .catch((error) => {
                console.error('Fehler beim Speichern des Trainings:', error);
            });
    };
    const handleCancel = () => {
        setDateSelectionDisabled(false);
        setClickedDates([]);
    };

    const handleArtChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedArt(value)
    };

    const renderArtCheckbox = (art: string) => {
        return (
            <label key={art} className={"art-checkbox"}>
                <input
                    type="checkbox"
                    value={art}
                    checked={selectedArt.includes(art)}
                    onChange={handleArtChange}
                />
                {art}
            </label>
        );
    };
const calendarOptions= {
    plugins:[dayGridPlugin, momentPlugin],
    initialView:"dayGridMonth",
    firstDay:1,
    // locale={deLocale}
    dayCellContent:renderDayButton,
    aspectRatio:1.5,
    height:300,
    dateClick:handleDayClick

}
    return (
        <>
            <div className={"container"}>
                <h1>Trainingsplaner</h1>
                {<FullCalendar {...calendarOptions}
                />}
            </div>

            {clickedDates.length > 0 && (
                <div className={"newtraining"}>
                    <h2> Add new Training</h2>
                    <ul>
                        {clickedDates.map((date, index) => (
                            <li className={"list1"} key={index}>{new Date(date).toLocaleDateString()}</li>
                        ))}

                    </ul>
                    <div className={"art-options"}>
                        {availableArtOptions.map((art) =>  renderArtCheckbox(art))}
                    </div>

                    <label className={"time-label"}>
                        <strong> Time : </strong>
                        <select className={"select-time"} onChange={handleTimeChange}>
                            {generateTimeOptions().map((timeOption) => (
                                <option className={"time"} key={timeOption} value={timeOption}>
                                    {timeOption}
                                </option>
                            ))}
                        </select>
                    </label>
                    {selectedArt && (
                        <div className={"selected-art"}>
                            <strong>Selected Art: </strong> {selectedArt}
                        </div>
                    )}
                    <div className={"space-div"}></div>
                        <button className={"addbutton"} onClick={handleAddTraining}>Add Training</button>
                        <button className={"cancelbutton"} onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </>
    )
}

export default MyCalendar;
