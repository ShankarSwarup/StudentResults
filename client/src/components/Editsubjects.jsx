import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Editsubjects = () => {
    const [subj,setsubj] = useState("");
    const [cod,setcod] = useState("");
    const handlesubmit = async(e) => {
        e.preventDefault();

        // console.log(lreg,lpassword);

        const res = await fetch('https://vignanminiproject.herokuapp.com/editsub',{
            method:'POST',
            headers: {
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                subj,
                cod
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
           alert(data.message);
        }
        else{
            alert(data.message);
        }
    }

  return (
    <div>
        <h1>Update Subject</h1>
        <h2>Update Subject</h2>
        <form onSubmit={handlesubmit}>
            <label htmlFor="sub">Subject Name:</label>
            <input type="text" name="" id="sub" value={subj} onChange={event => setsubj(event.target.value.toLowerCase())}/>
            <label htmlFor="code">Subject Code:</label>
            <input type="text" name="" id="code" value={cod} onChange={event => setcod(event.target.value)}/>
            <input type="submit" value="submit" />
        </form>
    </div>
  )
}

export default Editsubjects