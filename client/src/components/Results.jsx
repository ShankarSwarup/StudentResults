import {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import React from "react";
import * as XLSX from "xlsx";

const Results = () => {
  const [files,setfiles] = useState([]);
  const navigate = useNavigate();


  const onChange = (e) => {
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

    const res = await fetch('https://vignanminiproject.herokuapp.com/results',{
        method:'POST',
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            files
        })
    })

    // console.log(files);


    const data = await res.json()
    if(data.status === 'ok'){
        setfiles([]);
        alert("successful");
        // navigate("/results");
    }
    else{
        // setfiles([]);
        alert(data.message);
        navigate("/results");
    }
    
    
}

  return (
    <section className="user1" id="user1">
        <div className="container2">
            <div className="user signinBx">
                <div className="imgBx">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_h9rxcjpi.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}  loop  autoplay></lottie-player>
                </div>
                <div className="formBx">
                    <form onSubmit={handleSubmit}>
                    <h2>Student Results</h2>
                    <label htmlFor="file" id="lab">Add file</label>
                    <input type="file" id="file" onChange={onChange} style={{display : 'none'}}/>
                    <input type="submit"  />
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Results