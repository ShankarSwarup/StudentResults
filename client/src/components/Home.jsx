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
          <Link style={{textDecoration:'none'}} class="navbar-brand" to="/">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/form1">Teacher login</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/form2">Student login</Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div className="container">
        <div className="imgBx">
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_aao5ezov.json"  background="transparent"  speed="1"   loop autoplay></lottie-player>
        </div>
        <div className="main-content">
            <h1>WORK HARD TO HAVE A GOOD RESULT</h1>
            <h5>Success is a science if you have the conditions, you get the result - <strong>Oscar Wilde</strong> </h5>
        </div>
         </div>
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