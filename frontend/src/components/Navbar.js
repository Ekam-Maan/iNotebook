import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        iNotebook
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link active=${location.pathname === '/'}`}
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={`nav-link active=${location.pathname === '/about'}`} to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={`nav-link active=${location.pathname === '/newNote'}`} to="/newNote">
                                New Note <i className="fa-sharp fa-solid fa-plus"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled">
                                    Disabled
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {localStorage.getItem('authToken') ? <button className="btn btn-outline-danger" 
                              onClick={()=>{localStorage.removeItem('authToken')}}>logout</button>: 
                            <Link
                                className="btn btn-outline-success mx-1"
                                type="submit"
                                to="/login"
                            >
                                Login
                            </Link>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
