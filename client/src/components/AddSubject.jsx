import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const AddSubject = () => {
    const [subj,setsubj] = useState("");
    const [cod,setcod] = useState("");
    const handlesubmit = async(e) => {
        e.preventDefault();

        const res = await fetch('https://vignanminiproject.herokuapp.com/addsub',{
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
    <div id="bd">
    <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
    <h1>Subject Creation</h1>
    <div id="head">
    <h3>Create Subject</h3>
    </div>
    <div id="forms">
    <form onSubmit={handlesubmit}>
    <div class="form-group">
        <label for="exampleFormControlSelect2">Subject Name:</label>
        <input class="form-control" id="exampleFormControlSelect2" type="text"  value={subj} onChange={event => setsubj(event.target.value.toLowerCase())} placeholder="Enter Subject Name:"/>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput4">Subject Code:</label>
        <input type="text" className="form-control" id="exampleFormControlInput4" value={cod} onChange={event => setcod(event.target.value)} placeholder="Enter Subject Code:"/>
      </div>
      <input type="submit" value="submit" className="lin" />
    </form>
    </div>
  </div>
  </div>
    // <div>
    //     <h1>Subject Creation</h1>
    //     <h2>Create Subject</h2>
    //     <form onSubmit={handlesubmit}>
    //         <label htmlFor="sub">Subject Name:</label>
    //         <input type="text" name="" id="sub" value={subj} onChange={event => setsubj(event.target.value.toLowerCase())}/>
    //         <label htmlFor="code">Subject Code:</label>
    //         <input type="text" name="" id="code" value={cod} onChange={event => setcod(event.target.value)}/>
    //         <input type="submit" value="submit" />
    //     </form>
    // </div>
  )
}

export default AddSubject