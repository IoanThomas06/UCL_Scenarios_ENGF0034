import "./components.css"


function Navbar() {

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
                            <a className="nav-link" href="/listings">My Listings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/search">Search Listings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/borrowing">Borrowed Books</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-outline-dark"> 
                            <a className="nav-link" href="/login">
                                <i className="bi bi-person-circle me-2"></i>
                            Log in
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;