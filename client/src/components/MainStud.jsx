import React from 'react'
import { Link } from "react-router-dom";


const MainStud = () => {
  return (
    <div>
     <nav>
        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
            <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Student Results</label>
        <ul>
            <li><Link className="active" to="/mainstud">Home</Link></li>
            <li><Link  to="/studentres">Your Results</Link></li>
            <li><Link  to="/profile">Your Profile</Link></li>
        </ul>
    </nav>
    <div className="container">
        
    </div>
    </div>
  )
}

export default MainStud