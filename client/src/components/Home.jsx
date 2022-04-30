import React from 'react'
import '../css/App.css'
import { Link } from "react-router-dom";
import { Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const [te,sette] =  useState(localStorage.getItem('reg'));

  const Main = () => {
    return (
      <div className="content">
      <div className="navigation">
      <ul>
          <li className="list active">
              <Link to="/" className="link">
                  <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                  <span className="title">Home</span>
              </Link>
          </li>
          <li className="list">
              <Link to="/form1" className="link">
                  <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                  <span className="title">Teacher login / signup</span>
              </Link>
          </li>
          <li className="list" >
              <Link to="/form2" className="link">
                  <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                  <span className="title">Student login / signup</span>
              </Link>
          </li>
      </ul>
  </div>
      </div>
    )
  }
  return ( te ? <Navigate to ="/mainstud" /> : <Main/>)
}

export default Home