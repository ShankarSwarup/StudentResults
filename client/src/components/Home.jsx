import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
     <nav>
        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
            <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Student Results</label>
        <ul>
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link  to="/form1">Teacher login / signup </Link></li>
            <li><Link  to="/form2">Student login / signup </Link></li>
        </ul>
    </nav>
    <div className="container">
        
    </div>
    </div>
  )
}

export default Home