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
      <div className="content">
      <div className="navigation">
      <ul>
          <li className="list active">
              <Link to="/mainstud" className="link">
                  <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                  <span className="title">Home</span>
              </Link>
          </li>
          <li className="list">
              <Link to="/studentres" className="link">
                  <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
                  <span className="title">Your Results</span>
              </Link>
          </li>
          <li className="list" >
              <Link to="/profile" className="link">
                  <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                  <span className="title">Your Profile</span>
              </Link>
          </li>
          <li className="list">
            <button onClick={handle} className="link">
            <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <span className="title">Log Out</span>
            </button>
          </li>
      </ul>
      </div>
      </div>
    )
  }

  return (v ? <Xi/> : <Navigate to ="/" />)
  
}

export default MainStud