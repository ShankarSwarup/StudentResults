import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'
import '../css/Pro.css'

const Profile = () => {
  const [x,setx] = useState(JSON.parse(localStorage.getItem('profile')));
  const Func = () => {
    return (
      <div className="item">
        <div class="cards">
      <div class="imgBxs">
      <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ehs7xawx.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
      </div>
      <div className="head">
         <h2 class="heads">Profile</h2>
      </div>
      <div class="contents">
          <div class="detailss">
            <table >
              <tr>
                <td>Reg</td>
                <td>{x.Reg}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{x.Name}</td>
              </tr>
              <tr>
                <td>Dept</td>
                <td>{x.Dept}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{x.Email}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{x.Gender}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{x.State}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{x.Country}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{x.Address}</td>
              </tr>
            </table>
          </div>
      </div>
      </div>
      </div>
    )
  }
  return ( x ? <Func/>  : <Navigate to ="/" />)
}

export default Profile