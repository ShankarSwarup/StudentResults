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
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
          <Link style={{textDecoration:'none'}} class="navbar-brand" to="/mainstud">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/mainstud">Home</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link " aria-current="page" to="/studentres">Your Results</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link " aria-current="page" to="/profile">Your Profile</Link>
              </li>
              <li class="nav-item">
                <a style={{textDecoration:'none'}} class="nav-link"  href="http://shankarswarup.pythonanywhere.com">Blogs</a>
              </li>
              <li class="nav-item">
                <a style={{textDecoration:'none'}} class="nav-link" onClick={handle} href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div id="hm">
        </div>
        <footer class="bg-dark text-center text-white">
        <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
          © 2020 Copyright:
          <Link style={{textDecoration:'none'}} class="text-white" to="/mainstud">ShankarSwarup</Link>
        </div>
         </footer>
        {/* <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto" >
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Shankar Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
          </div> */}
      </div>
      // <div className="content">
      // <div className="navigation">
      // <ul>
      //     <li className="list active">
      //         <Link to="/mainstud" className="link">
      //             <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
      //             <span className="title">Home</span>
      //         </Link>
      //     </li>
      //     <li className="list">
      //         <Link to="/studentres" className="link">
      //             <span className="icon"><ion-icon name="stats-chart-outline"></ion-icon></span>
      //             <span className="title">Your Results</span>
      //         </Link>
      //     </li>
      //     <li className="list" >
      //         <Link to="/profile" className="link">
      //             <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
      //             <span className="title">Your Profile</span>
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

  return (v ? <Xi/> : <Navigate to ="/" />)
  
}

export default MainStud