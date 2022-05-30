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
      <div className="content">
      <div className="navigation">
      <ul>
          <li className="list active">
              <Link to="/mainteach" className="link">
                  <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                  <span className="title">Home</span>
              </Link>
          </li>
          <li className="list">
              <Link to="/addstudent" className="link">
                  <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                  <span className="title">Add Student Details</span>
              </Link>
          </li>
          <li className="list">
              <Link to="/adddet" className="link">
                  <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                  <span className="title">Subjects</span>
              </Link>
          </li>
          <li className="list" >
              <Link to="/addresults" className="link">
                  <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
                  <span className="title">Add results</span>
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

  return (v ? <Tmain/> : < Navigate to="/" />)
  
}

export default Mainteach