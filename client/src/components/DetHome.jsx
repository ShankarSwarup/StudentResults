import React from 'react'
import { Link } from 'react-router-dom'

const DetHome = () => {
  return (
    <div>
        Subject Details
        <ul>
            <li>
            <Link to="/addsub">Add Subjects</Link>
            </li>
            <li>
            <Link to="/subinfo">Subject Details</Link>
            </li>
            <li>
            <Link to="/combination">Add / Delete Subject to Dept</Link>
            </li>
            <li>
             <Link to="/sublist">Subject to Dept List</Link>
            </li>
        </ul>
    </div>
  )
}

export default DetHome