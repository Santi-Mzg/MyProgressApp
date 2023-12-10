import { useState } from 'react';
import Toolbar from './Toolbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleDateClick = date => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const mismaFecha = currentDate.getTime() === date.getTime();
        if(mismaFecha) 
            navigate(`/hoy`);
        else{
            const formattedDate = formatDate(date);
            navigate(`/${formattedDate}`);
        }
      };
      
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCalendarText("Fecha seleccionada: "+ date);
    }

    const formatDate = date => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      };

    return (
        <>
        <Toolbar/>
        <div className='calendar'>
            <h2 className='calendar-details'>{calendarText}</h2>
            <Calendar 
            onChange={setSelectedDate}
            value={selectedDate}
            onClickDay={handleDateClick}/>
        </div>
        </>
    );
}