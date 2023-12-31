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
            </div>
        </nav>
    )
 }

 export default Toolbar