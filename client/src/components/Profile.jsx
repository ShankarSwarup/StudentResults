import React, { useEffect, useState } from 'react'

const Profile = () => {
  const x = JSON.parse(localStorage.getItem('profile'));
  return (
    <div>Profile
      <p>{x.Reg}</p>
      <p>{x.Name}</p>
      <p>{x.Email}</p>
      <p>{x.Password}</p>
      <p>{x.Gender}</p>
      <p>{x.State}</p>
    </div>
  )
}

export default Profile