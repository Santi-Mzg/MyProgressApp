import { Link } from 'react-router-dom';

 function Toolbar() {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/MyProgressApp/" className="navbar-brand">
                    My Progress
                </Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to={`/MyProgressApp/${formattedDate}`} className="nav-link active">
                                Entrenamiento del día
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/MyProgressApp/calendar" className="nav-link">
                                Calendario
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
 }

 export default Toolbar