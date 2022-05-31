import React from 'react'
import '../css/App.css'
import { Link } from "react-router-dom";
import { Navigate, useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const [te,sette] =  useState(localStorage.getItem('reg'));

  const Main = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/form1">Teacher login / signup</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/form2">Student login / signup</Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div id="hm">
        </div>
        <footer class="bg-dark text-center text-white">
        <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
          © 2020 Copyright :
          <Link class="text-white" to="/"> ShankarSwarup</Link>
        </div>
         </footer>
      </div>
//       <div className="content">
//       <div className="navigation">
//       <ul>
//           <li className="list active">
//               <Link to="/" className="link">
//                   <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
//                   <span className="title">Home</span>
//               </Link>
//           </li>
//           <li className="list">
//               <Link to="/form1" className="link">
//                   <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
//                   <span className="title">Teacher login / signup</span>
//               </Link>
//           </li>
//           <li className="list" >
//               <Link to="/form2" className="link">
//                   <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
//                   <span className="title">Student login / signup</span>
//               </Link>
//           </li>
//       </ul>
//   </div>
//       </div>
    )
  }
  return ( te ? <Navigate to ="/mainstud" /> : <Main/>)
}

export default Home