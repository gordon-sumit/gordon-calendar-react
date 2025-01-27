import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, getCalendarData } from "./utility";

export default function Calendar({
                                     setSowCalendar,
                                     setChosenDate,
                                     disableDates = [],
                                     disablePastDates = false,
                                     chosenDate,
                                     minDate,
                                     maxDate,
                                 }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date(); // Today's date

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        if (chosenDate) {
            const [day, month, year] = chosenDate.split("/").map(Number);
            const formattedChosenDate = new Date(year, month - 1, day);
            if (!isNaN(formattedChosenDate)) {
                setCurrentDate(formattedChosenDate);
            }
        }
    }, [chosenDate]);

    const handleMonthChange = (delta) => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1)
        );
    };

    const onDatePick = (date) => {
        setChosenDate(formatDate(date, "dd/MM/yyyy"));
        setSowCalendar(false);
    };

    const onMonthSelect = (month) => {
        setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    };

    const onYearChange = (year) => {
        const parsedYear = parseInt(year, 10);
        if (!isNaN(parsedYear)) {
            setCurrentDate(new Date(parsedYear, currentDate.getMonth(), 1));
        }
    };

    const adjustYear = (delta) => {
        setCurrentDate(
            new Date(currentDate.getFullYear() + delta, currentDate.getMonth(), 1)
        );
    };

    const calendarData = getCalendarData(currentDate);

    const renderDayCell = (date, index) => {
        const isPrevMonth = index < calendarData.indexOf(1);
        const isNextMonth = index >= calendarData.lastIndexOf(1);

        const cellDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + (isPrevMonth ? -1 : isNextMonth ? 1 : 0),
            date
        );

        const formattedDate = formatDate(cellDate, "dd/MM/yyyy");
        const isToday =
            cellDate.toDateString() === today.toDateString() ||
            formattedDate === chosenDate;

        const isDisabled =
            (minDate && cellDate < new Date(minDate)) ||
            (maxDate && cellDate > new Date(maxDate)) ||
            disableDates.includes(formattedDate) ||
            (disablePastDates && cellDate < today && !isToday);

        const cellStyles = {
            padding: "4px",
            cursor: isDisabled ? "not-allowed" : "pointer",
            textAlign: "center",
            backgroundColor: formattedDate === chosenDate ? "#c2c0c0" : "transparent",
            borderRadius: isToday ? "50%" : "none",
            fontWeight: isToday ? "bold" : "normal",
            color: isPrevMonth || isNextMonth ? "gray" : "black",
        };

        return (
            <div
                key={index}
                onClick={!isDisabled ? () => onDatePick(cellDate) : undefined}
                className={isDisabled ? "disabled" : "celldate"}
                style={{ ...cellStyles, color: isDisabled ? "gray" : cellStyles.color }}
            >
                {date}
            </div>
        );
    };

    return (
        <div className="gordon-calendar-wrapper">
            <div className="date-navigation">
                <button onClick={() => handleMonthChange(-1)}>
                    <FontAwesomeIcon icon={faAngleLeft} className="icon-left" />
                </button>
                <div className="gc-date-header">
                    <select
                        className="gc-month-list"
                        value={currentDate.getMonth()}
                        onChange={(e) => onMonthSelect(Number(e.target.value))}
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <div className="gc-year-wrapper">
                        <input
                            type="number"
                            value={currentDate.getFullYear()}
                            onChange={(e) => onYearChange(e.target.value)}
                        />
                        <span className="arrowUp" onClick={() => adjustYear(1)}>
                            <FontAwesomeIcon icon={faAngleUp} />
                        </span>
                        <span className="arrowDown" onClick={() => adjustYear(-1)}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </div>
                </div>
                <button onClick={() => handleMonthChange(1)}>
                    <FontAwesomeIcon icon={faAngleRight} className="icon-left" />
                </button>
            </div>

            <div
                className="celldate-container"
                style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
            >
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div
                        key={i}
                        style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        {day}
                    </div>
                ))}
                {calendarData.map((date, index) => renderDayCell(date, index))}
            </div>
        </div>
    );
}
