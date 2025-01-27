export const formatDate = (date, format) => {
    const options = {
        // weekday: format.includes('dddd') ? 'long' : 'short',
        year: format.includes('yyyy') ? 'numeric' : undefined,
        month: format.includes('MMMM') ? 'long' : format.includes('MMM') ? 'short' : '2-digit',
        day: format.includes('dd') ? '2-digit' : undefined,
    };

    // Replace tokens in the format with respective date parts
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export
const getCalendarData = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // Day of the week (0-6)
    const daysInMonth = endOfMonth.getDate();

    // Previous month's dates
    const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0);
    const prevMonthDays = prevMonthEnd.getDate();
    const prevDates = [...Array(startDay).keys()].map(
        (i) => prevMonthDays - startDay + i + 1
    );

    // Current month's dates
    const currDates = [...Array(daysInMonth).keys()].map((i) => i + 1);

    // Next month's dates
    const remainingCells = 42 - (prevDates.length + currDates.length);
    const nextDates = [...Array(remainingCells).keys()].map((i) => i + 1);

    return [...prevDates, ...currDates, ...nextDates];
};