
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
import deLocale from '@fullcalendar/core/locales/de';
import {useState} from "react";


function MyCalendar() {
    const [clickedDate, setClickedDate] = useState(null);

    const handleDayClick = (arg) => {
        const clickedDateStr = arg.date.toISOString();
        setClickedDate(clickedDateStr);
    };

    const renderDayButton = (info) => {

        return (
            <button onClick={() => handleDayClick(info)}>
                {info.dayNumberText}
            </button>
        );
    };


    return (
        <>
            <h1>Mein Kalender</h1>
            <div style={{ width: "700px", height: "600px" }}>

                <FullCalendar
                    plugins={[dayGridPlugin, momentPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    locale={deLocale}
                    dayCellContent={renderDayButton}
                    options={{
                        dateClick: handleDayClick,
                    }}
                />
            </div>
            {clickedDate && (
                <label>
                    Geklicktes Datum: {new Date(clickedDate).toLocaleDateString()}
                </label>
            )}
        </>
    );
}

export default MyCalendar;
