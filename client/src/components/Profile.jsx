import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'
import '../css/Pro.css'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [x,setx] = useState(JSON.parse(localStorage.getItem('profile')));
  const Func = () => {
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
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/studentres">Your Results</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/profile">Your Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div id="bd" >
        <div id="stadi" className="shadow-sm p-3 mb-5 bg-white rounded">
          <div id="pic">
             <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ehs7xawx.json"  background="transparent"  speed="1" style={{width:'250px'}} class="rounded-circle shadow-4"  loop  autoplay></lottie-player>
             <h4>{x.Name}</h4>
             <h4>{x.Dept}</h4>
             <h4>{x.Reg}</h4>
             <div id="con" style={{marginTop:'20px'}}>
             <table className="table  table-hover" style={{width:'80%'}}>
              <tbody>
                <tr >
                  <th >Student Email:</th>
                  <td >{x.Email}</td>
                </tr>
                <tr >
                  <th >Student Gender:</th>
                  <td >{x.Gender}</td>
                </tr>
                <tr>
                  <th >Student Address:</th>
                  <td >{x.Address}</td>
                </tr>
              </tbody>
            </table>
             </div>
          </div>
        </div>
      </div>
      </div>
      // <div className="item">
      //   <div class="cards">
      // <div class="imgBxs">
      // <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ehs7xawx.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
      // </div>
      // <div className="head">
      //    <h2 class="heads">Profile</h2>
      // </div>
      // <div class="contents">
      //     <div class="detailss">
      //       <table >
      //         <tr>
      //           <td>Reg</td>
      //           <td>{x.Reg}</td>
      //         </tr>
      //         <tr>
      //           <td>Name</td>
      //           <td>{x.Name}</td>
      //         </tr>
      //         <tr>
      //           <td>Dept</td>
      //           <td>{x.Dept}</td>
      //         </tr>
      //         <tr>
      //           <td>Email</td>
      //           <td>{x.Email}</td>
      //         </tr>
      //         <tr>
      //           <td>Gender</td>
      //           <td>{x.Gender}</td>
      //         </tr>
      //         <tr>
      //           <td>Address</td>
      //           <td>{x.Address}</td>
      //         </tr>
      //       </table>
      //     </div>
      // </div>
      // </div>
      // </div>
    )
  }
  return ( x ? <Func/>  : <Navigate to ="/" />)
}

export default Profile