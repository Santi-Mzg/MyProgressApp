import { useState } from 'react';
import Toolbar from './Toolbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage( {} ) {
    const[allMonths, setAllMonths] = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];
    const[selectedDate, setSelectedDate] = useState();
    const[calendarText, setCalendarText] = useState('Sin fecha seleccionada');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCalendarText("Fecha seleccionada: "+ date);
    }

    return (
        <>
        <Toolbar/>
        <div className='calendar'>
            <h2 className='calendar-details'>{calendarText}</h2>
            <Calendar onChange={handleDateChange} value={new Date()}/>
        </div>
        </>
    );
}