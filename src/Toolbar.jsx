import { Link } from 'react-router-dom';

 function Toolbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">My Progress</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="#navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/">Entrenamiento de Hoy</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/calendar">Calendario</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Opciones</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Separated link</a>
                            </div>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Search"></input>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
 }

 export default Toolbar