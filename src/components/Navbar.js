import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient" style={{backgroundColor: '#563D7C'}}>
            <div className="container-fluid">
                <Link className="navbar-brand logo" to="/">AIS Quiz | 2021</Link>        
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/instructions">Instructions</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/hadeeth">Hadeeth</Link>
                        </li>                  
                    </ul>
                    <div className="btn-group" role="group" aria-label="Basic example">                                    
                        <a className="btn btn-primary bg-gradient btn-sm" href="http://facebook.com/aisuok" rel="noreferrer" target="_blank" >Like <i className="fab fa-facebook" /></a>
                        <a className="btn btn-info bg-gradient btn-sm" href="http://twitter.com/aisuok" rel="noreferrer" target="_blank" >Follow <i className="fab fa-twitter" /></a>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
