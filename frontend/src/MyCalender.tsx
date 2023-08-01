import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
//import deLocale from '@fullcalendar/core/locales/de'; deutsch
import {ChangeEvent, useState} from "react";
import axios from "axios";

function MyCalendar() {
    const [clickedDates, setClickedDates] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");

    const handleDayClick = (dateClickInfo: any) => {
        const clickedDateStr = dateClickInfo.date.toISOString();
        setClickedDates((prevDates) => [...prevDates, clickedDateStr]);

    };
    const renderDayButton = (info: { dayNumberText: string, date: Date }) => {
        return (
            <button className={"button"} onClick={() => handleDayClick(info)}>
                {info.dayNumberText}
            </button>
        );
    };
    const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
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
            date: clickedDates[clickedDates.length - 1],
            time: selectedTime
        };

        axios.post('/api/training', newTraining)
            .then((response) => {
                console.log('Training wurde erfolgreich gespeichert:', response.data);

            })
            .catch((error) => {
                console.error('Fehler beim Speichern des Trainings:', error);
            });
    };

    return (
        <>
            <div className={"container"}>
                <div className={"clander1"}>
                    <h1>Trainingsplaner</h1>
                    {<FullCalendar
                        plugins={[dayGridPlugin, momentPlugin]}
                        initialView="dayGridMonth"
                        firstDay={1}
                       // locale={deLocale}
                        dayCellContent={renderDayButton}
                        aspectRatio={1}
                        dateClick={handleDayClick}

                    />}
                </div>
            </div>
            {clickedDates.length > 0 && (
                <div className={"newtraining"}>
                    <h2> Add new Training</h2>
                    <ul >
                        {clickedDates.map((date, index) => (
                            <li className={ "list1"} key={index}>{new Date(date).toLocaleDateString()}</li>
                        ))}
                    </ul>
                    <label className={"time-label"}>
                        <strong> Time : </strong>
                        <select className={"select-time"} value={selectedTime} onChange={handleTimeChange}>
                            {generateTimeOptions().map((timeOption) => (
                                <option className={"time"} key={timeOption} value={timeOption}>
                                    {timeOption}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className={"space-div"}></div>
                    <button className={"addbutton"} onClick={handleAddTraining}>Add Training</button>
                </div>
            )}
        </>
    )
}

export default MyCalendar;
