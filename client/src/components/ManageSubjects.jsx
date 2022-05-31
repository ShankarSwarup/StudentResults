import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ManageSubjects = () => {
    const [dat,setdata] = useState([]);
    const [r,setr] = useState(-1);

    const handleedit = (i) => {
        alert(i);
    }

    const Ress = (props) => {
        console.log(props.da)
        var i=0;
        return(
            props.da.map((item)=>{
                i++;
                return(
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{item.Subject}</td>
                    <td>{item.Code}</td>
                  </tr>
                )
            })
        )
    }

    useEffect(() => {
        const sublist = async() => {
    
            const res = await fetch('https://vignanminiproject.herokuapp.com/sub',{
                method:'POST',
                headers: {
                     'Content-Type' : 'application/json'
                },
            })
    
            const data = await res.json()
            if(data.status === 'ok'){
               setdata(data.data);
            }
            else{
                alert(data.message);
            }
        }
        setTimeout(() => {
            sublist();
          }, 1000);

        //   console.log("hello");
    },[]);

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
        <Link class="navbar-brand" to="/mainteach">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/mainteach">Home</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link class="dropdown-item" to="/addstudent">Student Details</Link></li>
                  <li><Link class="dropdown-item" to="/addresults">Student Results</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Subjects
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link class="dropdown-item" to="/addsub">Add Subjects</Link></li>
                  <li><Link class="dropdown-item" to="/subinfo">Subject Details</Link></li>
                  <li><Link class="dropdown-item" to="/combination">Add / Delete SubjectCombo</Link></li>
                  <li><Link class="dropdown-item" to="/sublist">SubjectDept List</Link></li>
                </ul>
              </li>

            </ul>
            
          </div>
        </div>
        </nav>
        <div id="bd">
    <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
    <h1>Manage Subjects</h1>
    <div id="head">
    <h3>View Subjects Info</h3>
    <Link to="/editinfo" class="lin">Edit Subject</Link>
    </div>
    <div id='tab'>
    <table class="table table-bordered table-striped table-hover">
    <thead className="thead-light">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Subject Name</th>
        <th scope="col">Subject Code</th>
        </tr>
    </thead>
    <tbody>
    <Ress da={dat}/>
    </tbody>
    </table>
    </div>
  </div>
  </div>
        </div>
    
    // <div>
    //     <h1>Manage Subjects</h1>
    //     <h2>View Subjects info</h2>
    //     <table>
    //         <thead>
    //             <tr>
    //             <th>#</th>
    //             <th>Subject Name</th>
    //             <th>Subject Code</th>
    //             </tr>
    //         </thead>
    //         <Ress da={dat}/>
    //         <Link to="/editinfo">Edit</Link>
    //     </table>
    // </div>
  )
}

export default ManageSubjects