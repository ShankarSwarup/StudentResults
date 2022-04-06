import {useState} from 'react'
import React from "react";
import * as XLSX from "xlsx";

export default function Excel() {
  const [files,setfiles] = useState()

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data);
        // const workbookHeaders = xlsx.readFile(req.file.path, { sheetRows: 1 });
        // const columnsArray = xlsx.utils.sheet_to_json(workbookHeaders.Sheets["Sheet1"], { header: 1 })[0];
      setfiles(data);
      // console.log(Object.keys(data[0]));
      // console.log(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    console.log(files);
    const res = await fetch('http://localhost:4040/excel',{
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
        console.log("successful");
    }
    else{
        alert(data.error)
    }
    
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={onChange} />
        <input type="submit"  />
      </form>
    </div>
  );
}