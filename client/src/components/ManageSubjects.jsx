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
                  <div key={i}>
                  <tr>
                    <td>{i}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Code}</td>
                  </tr>
                  </div>
                )
            })
        )
    }

    useEffect(() => {
        const sublist = async() => {
    
            const res = await fetch('http://localhost:3001/sub',{
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
        <h1>Manage Subjects</h1>
        <h2>View Subjects info</h2>
        <table>
            <thead>
                <tr>
                <th>#</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                </tr>
            </thead>
            <Ress da={dat}/>
            <Link to="/editinfo">Edit</Link>
        </table>
    </div>
  )
}

export default ManageSubjects