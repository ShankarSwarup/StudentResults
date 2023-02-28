import React, { useState } from 'react'
import { Navigate} from 'react-router-dom'
// import '../css/Results.css'
import { Link } from 'react-router-dom';



const StudentDett = () => {

  const Funct = () => {
     const [ten,setten] = useState("");
     const [x,setx] = useState([]);

     const handleSubmit = async(e) => {
      e.preventDefault();
  
  
      const res = await fetch('https://backendapi-899p.onrender.com/finds',{
          method:'POST',
          headers: {
               'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
              ten
          })
      })
      const data = await res.json();
  
      if(data.status === 'ok'){
          setx(data.data);
          console.log(x);
      }
      else{
          alert(data.message)
      }
    }

     const handlechange = (event) => {
       setten(event.target.value);
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
                  Enter Details
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
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Check Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/studentress">Student Results</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/studentdett">Student Details</Link></li>
                  {/* <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addresults">Student Results</Link></li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      <div id="bd">
      <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Student Details</h1>
      <div id="head">
      <h3>Check Details</h3>
      <Link  to="/deptstu" className="lin" style={{textDecoration:'none'}} >Department Students Details</Link>
      </div>
      <div id="forms">
      <form onSubmit={handleSubmit}>
      <div class="form-group">
            <label for="exampleFormControlInput4">Registration Number:</label>
            <input autocomplete="off" type="text" className="form-control" id="exampleFormControlInput4" placeholder="Enter Registration Number:" value={ten} onChange={handlechange}   />
      </div>
        <input autocomplete="off" type="submit" value="check" className="lin" />
      </form>
      <div id="di">
            
            <div class="list-group" style={{marginTop:'20px'}}>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Name : <strong>{x["Name"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Department : <strong>{x["Dept"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Date of Birth : <strong>{x["DOB"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Gender : <strong>{x["Gender"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Email : <strong>{x["Email"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Phone Number : <strong>{x["Phn"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Graduation Year : <strong>{x["Year"]}</strong></h4>
            </button>
            <button type="button" class="list-group-item list-group-item-action " aria-current="true">
                <h4>Address : <strong>{x["Address"]}</strong></h4>
            </button>
            </div>
    </div>
      </div>
      </div>
      </div>
      </div>
     )
  }
  
  return (<Funct/>)

 
}

export default StudentDett

