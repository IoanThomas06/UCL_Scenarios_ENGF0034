function Footer() {
    return (
        <>
            <footer className="bg-dark text-light py-3 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <h5>About Us</h5>
                            <p className="small">
                                UCL Library Exchange is a platform designed to facilitate book sharing
                                within the UCL community.
                            </p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h5>Our Team</h5>
                            <p className="small">
                                We are a dedicated team of students and staff working to make
                                book exchange easier and more accessible.
                            </p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <h5>Contact Us</h5>
                            <p className="small">Email: library.exchange@ucl.ac.uk</p>
                            <div className="social-icons">
                                <a href="#" className="text-light me-3">
                                    <i className="bi bi-whatsapp fs-5"></i>
                                </a>
                                <a href="#" className="text-light me-3">
                                    <i className="bi bi-instagram fs-5"></i>
                                </a>
                                <a href="#" className="text-light">
                                    <i className="bi bi-envelope fs-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4"/>
                    <div className="text-center small">
                        <p>&copy; 2024 UCL Book Exchange. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;