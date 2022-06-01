import React, { useState } from 'react'
import { Navigate} from 'react-router-dom'
// import '../css/Results.css'
import { Link } from 'react-router-dom';



const StudentRes = () => {
  const [el,sete] = useState("1-1");
  const [x,setx] = useState([]);
  const [sub,setsub] = useState([]);
  const [back,setback] = useState([]);
  const [val,setval] = useState(false);
  const [v,setv] = useState(localStorage.getItem('profile'));
  const [xi,setxi] = useState(JSON.parse(localStorage.getItem('profile')));

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(v);
    var reg = xi["Reg"];
    var dept = xi["Dept"];
    var year = xi["Year"];
    // console.log(reg,dept,year);


    const res = await fetch('https://vignanminiproject.herokuapp.com/gets',{
        method:'POST',
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            el,
            reg,
            dept,
            year,
        })
    })
    const data = await res.json();

    if(data.status === 'ok' && data.message === 'Successful'){
        setx(data.data);
        setsub(data.data["subject"])
        setval(true);
        // console.log(x["subject"]);
        // alert("successful");
    }
    else if(data.status === 'ok' && data.message === 'backlogs')
    {
      setback(data.data);
      setsub([])
      setx([])
      setval(false)
      // console.log(back);
      // back.map((item)=>{
      //   console.log(item);
      // })
    }
    else{
        alert(data.message);
        setsub([])
        setx([])
        setback([])
        setval(false)
    }
  }

  const Resp = () => {
    if(val === true)
    {
      if(x)
      {
        return(
          <div id="di">
          <div id="tit" style={{marginBottom:'30px'}}>
          <h4 style={{marginBottom:'20px'}}>Student Name : <span>{xi["Name"]}</span></h4>
          <h4 style={{marginBottom:'20px'}}>Student Registration Number : <span>{xi["Reg"]}</span></h4>
          <h4 style={{marginBottom:'20px'}}>Student Department : <span>{xi["Dept"]}</span></h4>
          </div>
          <table className="table table-bordered table-striped table-hover">
          <thead className="thead-light">
              <tr>
              <th scope="col">Subject Name</th>
              <th scope="col">Grade</th>
              <th scope="col">Semister</th>
              </tr>
          </thead>
          <tbody>
          {
                      sub.map((item)=>{
                        return(
                          <tr key={item}>
                            <td>{item.sub}</td>
                            <td>{item.grade}</td>
                            <td>{el}</td>
                          </tr>
                        )
                      })
          }
          </tbody>
          </table>
          </div>
          
          // <div class="boxes center">
          //   <div className="boxx">
          //   <table class="tables">
          //     <tr>
          //     <th>Subjects</th>
          //     <th>Grades</th>
          //     </tr>
          //   {
          //     
          //   }
          //   </table>
          //   </div>
          // </div>
        )
      }
      
    }
    else
    {
        // alert("x");
        return(
          <div id="di">
          <div id="tit" style={{marginBottom:'30px'}}>
          <h4 style={{marginBottom:'20px'}}>Student Name : <span>{xi["Name"]}</span></h4>
          <h4 style={{marginBottom:'20px'}}>Student Registration Number : <span>{xi["Reg"]}</span></h4>
          <h4 style={{marginBottom:'20px'}}>Student Department : <span>{xi["Dept"]}</span></h4>
          </div>
          <table className="table table-bordered table-striped table-hover">
          <thead className="thead-light">
              <tr>
              <th scope="col">Subject Name</th>
              <th scope="col">Grade</th>
              </tr>
          </thead>
          <tbody>
          {
                  back.map((item)=>{
                    return(
                        <tr key={item}>
                          <td>{item}</td>
                          <td>F</td>
                        </tr>
                    )
                  })
          }
          </tbody>
          </table>
          </div>
          // <div class="boxes center">
          //   <div className="boxx">
          //   <table class="tables">
          //     <tr>
          //     <th>Subjects</th>
          //     </tr>
          //     {
          //     back.map((item)=>{
          //       return(
          //         <div key="item">
          //           <tr>
          //             <td>{item}</td>
          //           </tr>
          //         </div>
          //       )
          //     })
          //     }
          //   </table>
          //   </div>
          // </div>
        )
    }
  }

  const Funct = () => {
     return (
      <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
          <Link style={{textDecoration:'none'}} class="navbar-brand" to="/mainstud">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/mainstud">Home</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/studentres">Your Results</Link>
              </li>
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/profile">Your Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="bd">
      <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Student Result Details</h1>
      <div id="head">
      <h3>Check Results</h3>
      </div>
      <div id="forms">
      <form onSubmit={handleSubmit}>
      <div class="form-group">
          <label for="exampleFormControlSelect2">Select Semister:</label>
             <select autocomplete="off" class="form-control" id="exampleFormControlSelect2" value={el} onChange={event => sete(event.target.value)}>
             <option value="1-1">1-1</option>
             <option value="1-2">1-2</option>
             <option value="2-1">2-1</option>
             <option value="2-2">2-2</option>
             <option value="3-1">3-1</option>
             <option value="3-2">3-2</option>
             <option value="4-1">4-1</option>
             <option value="4-2">4-2</option>
             <option value="backlog">backlogs</option>
             </select>
        </div>
        <input autocomplete="off" type="submit" value="submit" className="lin" />
      </form>
      <Resp />
      </div>
      </div>
      </div>
      </div>
    //   <div className="main center">
    //   <div className="box center">
    //     <h2 className="headi">Results</h2>
    //     <div className="inputs">
    //       <form onSubmit={handleSubmit} className="forms">
    //         <select value={el} onChange={event => sete(event.target.value)}>
    //         <option value="1-1">1-1</option>
    //         <option value="1-2">1-2</option>
    //         <option value="2-1">2-1</option>
    //         <option value="2-2">2-2</option>
    //         <option value="3-1">3-1</option>
    //         <option value="3-2">3-2</option>
    //         <option value="4-1">4-1</option>
    //         <option value="4-2">4-2</option>
    //         <option value="backlog">backlogs</option>
    //         </select>
    //         <input type="submit" value="Submit" />
    //       </form>
    //     </div>
    //   </div>
    //   <Resp />
    // </div>
     )
  }
  
  return ( v ? <Funct/> : <Navigate to ="/" />)

 
}

export default StudentRes

