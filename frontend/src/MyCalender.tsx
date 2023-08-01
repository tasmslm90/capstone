import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
import deLocale from '@fullcalendar/core/locales/de';
import {ChangeEvent, ChangeEventHandler, useState} from "react";

function MyCalendar() {
    const [clickedDates, setClickedDates] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTrainingArten, setSelectedTrainingArten] = useState<string[]>([]);

    const handleDayClick = (dateClickInfo:any) => {
        const clickedDateStr = dateClickInfo.date.toISOString();
        setClickedDates((prevDates) => [...prevDates, clickedDateStr]);

    };
    const renderDayButton = (info: {dayNumberText:string,date:Date}) => {
        return (
            <button  className={"button"} onClick={() => handleDayClick(info)}>
                {info.dayNumberText}
            </button>
        );
    };
    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
    };

    const handleTrainingArtChange = (event:ChangeEvent<HTMLInputElement>) => {
        const selectedTrainingArt = event.target.value;
        setSelectedTrainingArten((prevTrainingArten) =>
            event.target.checked
                ? [...prevTrainingArten, selectedTrainingArt]
                : prevTrainingArten.filter((art) => art !== selectedTrainingArt)
        );
    };

    return (
        <>
            <div className={"div1"}>
                <FullCalendar
                    plugins={[dayGridPlugin, momentPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    locale={deLocale}
                    dayCellContent={renderDayButton}
                    aspectRatio= {1}
                    dateClick={handleDayClick}

                />
            </div>
            {clickedDates.length > 0 && (
                <div>
                    <h2>Neu Training hinzufügen:</h2>
                    <ul>
                        {clickedDates.map((date, index) => (
                            <li key={index}>{new Date(date).toLocaleDateString()}</li>
                        ))}
                    </ul>

                    <label>
                        Uhrzeit:
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                        />
                    </label>
                    <div className={"art"}>
                        Trainingsart:
                        <label>
                            <input
                                type="checkbox"
                                value="Kondition"
                                checked={selectedTrainingArten.includes("Kondition")}
                                onChange={handleTrainingArtChange}
                            />
                            Kondition
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Kraft"
                                checked={selectedTrainingArten.includes("Kraft")}
                                onChange={handleTrainingArtChange}
                            />
                            Kraft
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Taktik"
                                checked={selectedTrainingArten.includes("Taktik")}
                                onChange={handleTrainingArtChange}
                            />
                            Taktik
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Besprechung"
                                checked={selectedTrainingArten.includes("Besprechung")}
                                onChange={handleTrainingArtChange}
                            />
                            Besprechung
                        </label>
                    </div>


                </div>
            )}
        </>
            )
}
export default MyCalendar;
