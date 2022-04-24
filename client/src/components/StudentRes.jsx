import React, { useState } from 'react'



const StudentRes = () => {
  const [el,sete] = useState("1-1");
  const [x,setx] = useState([]);
  const [sub,setsub] = useState([]);
  const [v,setv] = useState(localStorage.getItem('reg'));
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(v);

    const res = await fetch('http://localhost:3001/gets',{
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

    if(data.status === 'ok'){
        setx(data.data);
        setsub(data.data["subject"])
        // console.log(x["subject"]);
        // alert("successful");
    }
    else{
        alert(data.message);
        setsub([])
        setx([])
    }
  }

  const Resp = () => {
    if(x!==[])
    {
      return(
        <div>
          {
            sub.map((item)=>{
              return(
                <div>
                <p>{item.sub}</p>
                <p>{item.grade}</p>
                </div>
              )
            })
          }
        </div>
      )
    }
    else
    {
      return(
        <div>
          <p>No data</p>
        </div>
      )
    }
  }

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
      </select>
      <input type="submit" value="Submit" />
      </form>
      <Resp />

      
    </div>
  )
}

export default StudentRes