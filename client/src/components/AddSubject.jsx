import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'

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
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
        <Link style={{textDecoration:'none'}} class="navbar-brand" to="/mainteach">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/mainteach">Home</Link>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addstudent">Student Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addresults">Student Results</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Subjects
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addsub">Add Subjects</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/subinfo">Subject Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/combination">Add / Delete SubjectCombo</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/sublist">SubjectDept List</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </nav>
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
        <input autocomplete="off" class="form-control" id="exampleFormControlSelect2" type="text"  value={subj} onChange={event => setsubj(event.target.value.toLowerCase())} placeholder="Enter Subject Name:"/>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput4">Subject Code:</label>
        <input autocomplete="off" type="text" className="form-control" id="exampleFormControlInput4" value={cod} onChange={event => setcod(event.target.value)} placeholder="Enter Subject Code:"/>
      </div>
      <input autocomplete="off" type="submit" value="submit" className="lin" />
    </form>
    </div>
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