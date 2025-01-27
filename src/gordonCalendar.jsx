import Calendar from "./calendar";
import React, {useEffect, useRef, useState} from "react";
import './css/calendar.css'

const GordonCalendar= ({placeholder, id, classNames, disableDates, disablePastDates, minDate, maxDate})=> {
    const [showCalendar, setShowCalendar] = useState(false);
    const [chosenDate, setChosenDate] = useState('');
    const calendarRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the calendar container
            if ((calendarRef.current && !calendarRef.current.contains(event.target)) && (inputRef.current && inputRef.current !== event.target)) {
                setShowCalendar(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onClickInput = () => {
        setShowCalendar(true)
    }

    return <div className="gordon-calendar-main">
        <input type="text"
               ref={inputRef}
               value={chosenDate}
               onFocus={onClickInput}
               onChange={(e)=>setChosenDate(e.target.value)}
               placeholder={placeholder}
               className={classNames}
               id={id}
               readOnly={true}
        />
        {showCalendar && (
            <div ref={calendarRef}>
                <Calendar
                    setSowCalendar={setShowCalendar}
                    setChosenDate={setChosenDate}
                    disableDates={disableDates}
                    disablePastDates={disablePastDates}
                    chosenDate={chosenDate}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
        )}
    </div>
}

export default GordonCalendar;