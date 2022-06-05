import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from "react-router-dom";

export default class DeptStuDet extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      dep:'',
      sems:'',
      sub:'',
      reg:'',
      dept:[],
      sem:[],
      roll:[],
      year:'',
      xi:{},
      grad:[],
      gra:'',
    }
  }

 async getOptions(){
    const depths = ['CSE','ECE','EEE','CIVIL','MECH','ECM','IT']


    const depts = depths.map(d=>({
        "value":d,
        "label":d
    }))

    this.setState({dept:depts})
  }



   handledept(e){
    this.setState({dep:e.value})
   }

   handlesem(e){
    this.setState({sems:e.value})
   }
   handleyear(e){
     var x = String(e.target.value);
     this.setState({year:x})
   }
   handleroll(e){
     this.setState({reg:e.value});
   }
   handledet(e){
     e.preventDefault();

     const depart = this.state.dep;
     const year = this.state.year;

        axios.post('https://vignanminiproject.herokuapp.com/findstudents',{
        year,
        depart
       }).then(res=>{
         if(res.data.message==="No Students")
         {
            // window.open("/addresults");
            alert(res.data.message);
         }
         else
         {
           this.setState({roll:res.data.data});
          //  alert(res.data.message);
         }
        //  alert(res.data.message);
       }).catch(err=> console.log(err))


   }


  componentDidMount(){
      this.getOptions()
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{margin:'0px'}}>
        <div class="container-fluid">
        <Link style={{textDecoration:'none'}} class="navbar-brand" to="/mainteach">Student Results</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link style={{textDecoration:'none'}} class="nav-link active" aria-current="page" to="/mainteach">Home</Link>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Enter Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addstudent">Student Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addresults">Student Results</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Subjects
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addsub">Add Subjects</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/subinfo">Subject Details</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/combination">Add / Delete SubjectCombo</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/sublist">SubjectDept List</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a style={{textDecoration:'none'}} class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Check Details
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/studentress">Student Results</Link></li>
                  <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/studentdett">Student Details</Link></li>
                  {/* <li><Link style={{textDecoration:'none'}} class="dropdown-item" to="/addresults">Student Results</Link></li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </nav>
        <div id="bd">
        <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
        <h1>Student Details</h1>
        <div id="head">
        <h3>Enter Details</h3>
        </div>
        <div id="forms">
        <form>
        <div class="form-group">
            <label for="exampleFormControlSelect2">Department</label>
            <Select autocomplete="off" class="form-control" id="exampleFormControlSelect2" options={this.state.dept} onChange={this.handledept.bind(this)} placeholder="Select Department" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput4">Graduation Year</label>
            <input autocomplete="off" type="text" className="form-control" id="exampleFormControlInput4" placeholder="Enter Graduation Year"  value={this.state.year} onChange={this.handleyear.bind(this)} />
          </div>
           <button className="btn btn-primary" style={{ marginBottom:'10px'}} onClick={this.handledet.bind(this)}>Get Details</button>
        </form>
        <table className="table table-bordered table-striped table-hover">
            <thead className="thead-light">
                <tr>
                <th scope="col">Student Registration Number:</th>
                <th scope="col">Student Name:</th>
                <th scope="col">Student Email:</th>
                <th scope="col">Student Phn:</th>
                </tr>
            </thead>
            <tbody>
            {
                    this.state.roll.map((item)=>{
                      return(
                          <tr key={item}>
                            <td>{item.Reg}</td>
                            <td>{item.Name}</td>
                            <td>{item.Email}</td>
                            <td>{item.Phn}</td>
                          </tr>
                      )
                    })
            }
            </tbody>
            </table>
        </div>
      </div>
      </div>
      </div>
     
      // <div>
      //   <h1>Declare Result</h1>
      //   <form >
      //   <label htmlFor="dept">Select Department:</label>
      //   <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
      //   <label htmlFor="sem">Select Semister:</label>
      //   <Select id="sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
      //   <label htmlFor="year">Select Graduation Year:</label>
      //   <input type="text" value={this.state.year} onChange={this.handleyear.bind(this)} />
      //   <button onClick={this.handledet.bind(this)}>Get Details</button>
        
      //   <div>
      //   <label htmlFor="Reg">Registration Number</label>
      //   <Select id="Reg" options={this.state.roll} onChange={this.handleroll.bind(this)} />
      //   {
          
      //     this.state.selectOptions.map(di=>{
      //       return(
      //           <div key={this.state.selectOptions.indexOf(di)}>
      //           <label htmlFor={di}>{di}</label>
      //           <Select id={di}  options={this.state.grad} onChange={(e)=> this.handlegrad(e,di)} />
      //           </div>
      //       )
      //     }) 
      //   }
      //   </div>
      //   <button onClick={this.handlesubmits.bind(this)}>Add Results</button>
      //   </form>

      //   <Link to="/results" className="link">Upload Through Excel</Link>
      //   <Link to="/supply" className="link" >Add Supply Results Here</Link>
      // </div>
    )
  }
}