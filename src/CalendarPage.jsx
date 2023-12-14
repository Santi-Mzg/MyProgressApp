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
    const navigate = useNavigate();

    const handleDateClick = date => {
        const formattedDate = formatDate(date);
        navigate(`/MyProgressApp/${formattedDate}`);
      };

    const formatDate = date => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      };

    return (
        <>
        <Toolbar/>
        <div className='calendar'>
            <h2 className='calendar-details'></h2>
            <Calendar onClickDay={handleDateClick}/>
        </div>
        </>
    );
}