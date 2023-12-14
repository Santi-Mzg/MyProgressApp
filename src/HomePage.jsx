import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from './Toolbar';

export default function HomePage () {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    return (
        <>
            <Toolbar/>
            <div className="d-grid gap-2">
                {'\u00A0'}  
                <Link to={`/MyProgressApp/${formattedDate}`}>
                    <button className="btn btn-lg btn-primary" type="button">Entrenamiento del dia</button>
                </Link>
                <Link to="/MyProgressApp/calendar">
                    <button className="btn btn-lg btn-primary" type="button">Calendario</button>
                </Link>
            </div>
        </>
    );
}