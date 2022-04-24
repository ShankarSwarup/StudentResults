import React from 'react'
import { Link } from "react-router-dom";


const Mainteach = () => {
  return (
    <div>
     <nav>
        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
            <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Student Results</label>
        <ul>
            <li><Link className="active" to="/mainteach">Home</Link></li>
            <li><Link  to="/studentdet">Add Student Details</Link></li>
            <li><Link  to="/results">Add Results</Link></li>
        </ul>
    </nav>
    <div className="container">
        
    </div>
    </div>
  )
}

export default Mainteach