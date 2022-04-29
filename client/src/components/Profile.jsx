import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'

const Profile = () => {
  const [x,setx] = useState(JSON.parse(localStorage.getItem('profile')));
  const Func = () => {
    return (
      <div>Profile
        <p>{x.Reg}</p>
        <p>{x.Name}</p>
        <p>{x.Dept}</p>
        <p>{x.Email}</p>
        <p>{x.Password}</p>
        <p>{x.Gender}</p>
        <p>{x.State}</p>
      </div>
    )
  }
  return ( x ? <Func/>  : <Navigate to ="/" />)
}

export default Profile