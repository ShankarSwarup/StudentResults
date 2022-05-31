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
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
        <Link style={{textDecoration:'none'}} class="navbar-brand" to="/mainteach">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/mainteach">Home</Link>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addstudent">Student Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addresults">Student Results</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Subjects
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addsub">Add Subjects</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/subinfo">Subject Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/combination">Add / Delete SubjectCombo</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/sublist">SubjectDept List</Link></li>
                </ul>
              </li>
              <li class="nav-item">
                <a style={{textDecoration:'none'}} class="nav-link" onClick={handle} href="#" >Logout</a>
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
          <Link style={{textDecoration:'none'}} class="text-white" to="/mainteach"> ShankarSwarup</Link>
        </div>
         </footer>
      </div>
         
      // <div className="content">
      // <div className="navigation">
      // <ul>
      //     <li className="list active">
      //         <Link to="/mainteach" className="link">
      //             <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
      //             <span className="title">Home</span>
      //         </Link>
      //     </li>
      //     <li className="list">
      //         <Link to="/addstudent" className="link">
      //             <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
      //             <span className="title">Add Student Details</span>
      //         </Link>
      //     </li>
      //     <li className="list">
      //         <Link to="/adddet" className="link">
      //             <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
      //             <span className="title">Subjects</span>
      //         </Link>
      //     </li>
      //     <li className="list" >
      //         <Link to="/addresults" className="link">
      //             <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
      //             <span className="title">Add results</span>
      //         </Link>
      //     </li>
      //     <li className="list">
      //       <button onClick={handle} className="link">
      //       <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
      //       <span className="title">Log Out</span>
      //       </button>
      //     </li>
      // </ul>
      // </div>
      // </div>
    )
  }

  return (v ? <Tmain/> : < Navigate to="/" />)
  
}

export default Mainteach