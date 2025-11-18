import {useState} from 'react'
import React from "react";
import * as XLSX from "xlsx";
import { Navigate ,useNavigate} from 'react-router-dom'

const StudentDet = () => {
  const [files,setfiles] = useState();
  const [name,setName] = useState("");
  const [te,sette] =  useState(localStorage.getItem('tid'));

  const onChange = (e) => {
    setName(e.target.files[0]["name"]);
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setfiles(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    console.log(files);
    const res = await fetch('https://studentresults-5sr4.onrender.com/excel',{
        method:'POST',
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            files
        })
    })

    const data = await res.json()
    if(data.status === 'ok'){
        alert("successful");
    }
    else{
        alert(data.error)
    }
    
}

const Func = () => {
  return (
    <section className="user1" id="user1">
        <div className="container2">
            <div className="user signinBx">
                <div className="imgBx">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_h9rxcjpi.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}  loop  autoplay></lottie-player>
                </div>
                <div className="formBx">
                    <form onSubmit={handleSubmit}>
                    <h2>Student Details Upload</h2>
                    <label htmlFor="file" id="lab">Add file</label>
                    <input autocomplete="off" type="file" id="file" onChange={onChange} style={{display : 'none'}}/>
                    <p>File Name : <strong>{name}</strong></p>
                    <input autocomplete="off" type="submit"  />
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

return ( te ? <Func/> : <Navigate to ="/" />)
}

export default StudentDet