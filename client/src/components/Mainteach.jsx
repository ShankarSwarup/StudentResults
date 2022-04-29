import React from 'react'
import { Link } from "react-router-dom";
import { Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'


const Mainteach = () => {
  const navigate = useNavigate();
  const [v,setv] = useState(localStorage.getItem('tid'));

  const Tmain = () => {
    const handle = () => {
      localStorage.removeItem('tid');
      navigate("/");
    } 

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
              <li><button onClick={handle}>Log out</button></li>
          </ul>
      </nav>
      <div className="container">
          
      </div>
      </div>
    )
  }

  return (v ? <Tmain/> : < Navigate to="/" />)
  
}

export default Mainteach