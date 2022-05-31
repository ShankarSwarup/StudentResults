import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'
import '../css/Pro.css'

const Profile = () => {
  const [x,setx] = useState(JSON.parse(localStorage.getItem('profile')));
  const Func = () => {
    return (
        <div id="bd" >
        <div id="stadi" className="shadow-sm p-3 mb-5 bg-white rounded">
          <div id="pic">
             <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ehs7xawx.json"  background="transparent"  speed="1" style={{width:'250px'}} class="rounded-circle shadow-4"  loop  autoplay></lottie-player>
             <h4>{x.Name}</h4>
             <h4>{x.Dept}</h4>
             <h4>{x.Reg}</h4>
             <table className="table  table-striped table-hover ">
              <tbody>
                <tr style={{height:'60px',marginBottom:'10px'}}>
                  <th style={{fontSize:'25px'}}>Student Email:</th>
                  <td style={{fontSize:'20px'}}>{x.Email}</td>
                </tr>
                <tr style={{height:'60px',marginBottom:'10px'}}>
                  <th style={{fontSize:'25px'}}>Student Gender:</th>
                  <td style={{fontSize:'20px'}}>{x.Gender}</td>
                </tr>
                <tr style={{height:'60px',marginBottom:'10px'}}>
                  <th style={{fontSize:'25px'}}>Student Address:</th>
                  <td style={{fontSize:'20px'}}>{x.Address}</td>
                </tr>
              </tbody>
            </table>
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