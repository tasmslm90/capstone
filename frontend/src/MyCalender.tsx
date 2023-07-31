import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
import deLocale from '@fullcalendar/core/locales/de';
import {useState} from "react";

function MyCalendar() {
    const [clickedDates, setClickedDates] = useState<string[]>([]);

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
                </div>
            )}
        </>
    );
}

export default MyCalendar;
