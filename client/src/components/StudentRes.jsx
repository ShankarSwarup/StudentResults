import React, { useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'
// import '../css/Results.css'



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


    const res = await fetch('http://localhost:3001/gets',{
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
          <div class="boxes center">
            <div className="boxx">
            <table class="tables">
              <tr>
              <th>Subjects</th>
              <th>Grades</th>
              </tr>
            {
              sub.map((item)=>{
                return(
                  <div key="item">
                  <tr>
                    <td>{item.sub}</td>
                    <td>{item.grade}</td>
                  </tr>
                  </div>
                )
              })
            }
            </table>
            </div>
          </div>
        )
      }
      
    }
    else
    {
        // alert("x");
        return(
          <div class="boxes center">
            <div className="boxx">
            <table class="tables">
              <tr>
              <th>Subjects</th>
              </tr>
              {
              back.map((item)=>{
                return(
                  <div key="item">
                    <tr>
                      <td>{item}</td>
                    </tr>
                  </div>
                )
              })
              }
            </table>
            </div>
          </div>
        )
    }
  }

  const Funct = () => {
     return (
      <div className="main center">
      <div className="box center">
        <h2 className="headi">Results</h2>
        <div className="inputs">
          <form onSubmit={handleSubmit} className="forms">
            <select value={el} onChange={event => sete(event.target.value)}>
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
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <Resp />
    </div>
     )
  }
  
  return ( v ? <Funct/> : <Navigate to ="/" />)

 
}

export default StudentRes


{/* <div>StudentRes
      <form onSubmit={handleSubmit}>
      <select value={el} onChange={event => sete(event.target.value)}>
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
      <input type="submit" value="Submit" />
      </form>

      
    </div> */}