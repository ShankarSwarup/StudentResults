import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react'
// import { useNavigate} from 'react-router-dom'
import { Navigate, useNavigate} from 'react-router-dom'



const MainStud = () => {
  const navigate = useNavigate();
  const [v,setv] = useState(localStorage.getItem('reg'));

  const handle = () => {
    localStorage.removeItem('reg');
    localStorage.removeItem('profile');
    navigate("/");
  }

  const Xi = () => {
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
              <li><button onClick={handle}>Log out</button></li>
          </ul>
      </nav>
      <div className="container">
          
      </div>
      </div>
    )
  }

  return (v ? <Xi/> : <Navigate to ="/" />)
  
}

export default MainStud