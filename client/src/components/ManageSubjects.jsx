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