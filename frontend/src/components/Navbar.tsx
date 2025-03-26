import "./components.css"
import { useAuth } from "../AuthContext";

function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar  sticky-top navbar-expand-lg navbar navbarBackground">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <i className="bi bi-book me-2"></i>
                    UCL Book Exchange
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/search">Search</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/borrowing">Borrowed</a>
                        </li>
                    </ul>
                    {!user && 
                    <div className="d-flex">
                        <a href="http://127.0.0.1:8000/api/login" >
                            <img src="https://s3.eu-west-2.amazonaws.com/uclapi-static/SignInWithUCLSmall.png"  className = "ucl_signin"/>
                        </a>
                    </div>}
                    {user &&
                    <div className="d-flex">
                        <span className="navbar-text me-3">
                            {user}
                        </span>
                        <a href="/logout" className="btn btn-outline-dark">Logout</a>
                    </div>}
                    
                </div>
            </div>
        </nav>
    );
}

export default Navbar;