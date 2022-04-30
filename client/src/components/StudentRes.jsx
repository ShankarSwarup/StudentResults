import React, { useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'




const StudentRes = () => {
  const [el,sete] = useState("1-1");
  const [x,setx] = useState([]);
  const [sub,setsub] = useState([]);
  const [back,setback] = useState([]);
  const [val,setval] = useState(false);
  const [v,setv] = useState(localStorage.getItem('reg'));
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(v);

    const res = await fetch('https://vignanminiproject.herokuapp.com/gets',{
        method:'POST',
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            el,
            v
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
          <div>
            {
              sub.map((item)=>{
                return(
                  <div key="item">
                  <p>{item.sub}</p>
                  <p>{item.grade}</p>
                  </div>
                )
              })
            }
          </div>
        )
      }
      
    }
    else
    {
        // alert("x");
        return(
          <div>
            {
              back.map((item)=>{
                return(
                  <div key="item">
                  <p>{item}</p>
                  </div>
                )
              })
            }
          </div>
        )
    }
  }

  const Funct = () => {
     return (
    <div>StudentRes
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
      <Resp />

      
    </div>
     )
  }
  
  return ( v ? <Funct/> : <Navigate to ="/" />)

 
}

export default StudentRes