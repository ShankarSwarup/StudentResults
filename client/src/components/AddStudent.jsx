import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/studad.css';

export default class AddStudent extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      dep:'',
      gender:'',
      name:'',
      roll:'',
      email:'',
      dob:'',
      phn:'',
      add:'',
      year:'',
      dept:[],
      gen:[]
    }
  }

 async getOptions(){
    const depths = ['CSE','ECE','EEE','CIVIL','MECH','ECM','IT']
    const gen = ['Male','Female']

    const depts = depths.map(d=>({
        "value":d,
        "label":d
    }))

    const gend = gen.map(d=>({
        "value":d,
        "label":d
    }))

    this.setState({dept:depts,gen:gend})

  }

  handlename(e){
    this.setState({name:e.target.value})
   }
   handleroll(e){
    this.setState({roll:e.target.value})
   }
   handlephn(e){
    this.setState({phn:e.target.value})
   }
   handleadd(e){
    this.setState({add:e.target.value})
   }
   handleemail(e){
    this.setState({email:e.target.value})
   }
   handledob(e){
    this.setState({dob:e.target.value})
   }
   handleyear(e){
    this.setState({year:e.target.value})
   }

  handlegend(e){
    this.setState({gender:e.value})
   }

  handledept(e){
    this.setState({dep:e.value})
   }

   handlesubmit(e){
       e.preventDefault();
      
       const depart = this.state.dep;
       const name =this.state.name;
       const reg = this.state.roll;
       const dob = this.state.dob;
       const email = this.state.email;
       const phn = this.state.phn;
       const gender = this.state.gender;
       const address = this.state.add;
       const year = this.state.year;
       
       axios.post('https://vignanminiproject.herokuapp.com/addstud',{
        depart,
        name,
        reg,
        dob,
        email,
        phn,
        address,
        gender,
        year,
       }).then(res=>alert(res.data.message)).catch(err=> console.log(err))
   }

   

  componentDidMount(){
      this.getOptions()
  }

  render() {
    // console.log(this.state.selectOptions)
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
                  Details
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
            </ul>
          </div>
        </div>
        </nav>
        <div id="bd">
        <div id="stad" className="shadow-lg border-0 rounded-lg mt-5">
        <h1>Student Admission</h1>
        <div id="head">
        <h3>Fill the Student info</h3>
        <Link to="/studentdet" className="lin" style={{ textDecoration: 'none' }}>Upload Through Excel</Link>
        </div>
        <div id="forms">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Full Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Full Name" value={this.state.name} onChange={this.handlename.bind(this)}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput2">Registration Number</label>
            <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Enter Registration Number"  value={this.state.roll} onChange={this.handleroll.bind(this)}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput3">Email</label>
            <input type="email" className="form-control" id="exampleFormControlInput3" placeholder="Enter Email address" value={this.state.email} onChange={this.handleemail.bind(this)}/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput4">Graduation Year</label>
            <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="Enter Graduation Year"  value={this.state.year} onChange={this.handleyear.bind(this)} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput5">Phone Number</label>
            <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="Enter Phone Number"  value={this.state.phn} onChange={this.handlephn.bind(this)} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput6">Date of Birth</label>
            <input type="date" className="form-control" id="exampleFormControlInput6" value={this.state.dob} onChange={this.handledob.bind(this)} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Gender</label>
            <Select class="form-control" id="exampleFormControlSelect1" options={this.state.gen} onChange={this.handlegend.bind(this)} placeholder="Select Gender" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect2">Department</label>
            <Select class="form-control" id="exampleFormControlSelect2" options={this.state.dept} onChange={this.handledept.bind(this)} placeholder="Select Department" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Enter Address</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.add} onChange={this.handleadd.bind(this)}></textarea>
          </div>
           <button className="btn btn-success" onClick={this.handlesubmit.bind(this)}>Add Details</button>
        </form>
        {/* <form >
        <label htmlFor="name">Full Name:</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Full Name" value={this.state.name} onChange={this.handlename.bind(this)}/>
        <label htmlFor="roll">Registration Number:</label>
        <input type="text" id="roll" value={this.state.roll} onChange={this.handleroll.bind(this)}/>
        <label htmlFor="ema">Email id:</label>
        <input type="email"  id="ema" value={this.state.email} onChange={this.handleemail.bind(this)} />
        <label htmlFor="gen">Gender:</label>
        <Select id="gen" options={this.state.gen} onChange={this.handlegend.bind(this)} />
        <label htmlFor="year">Year:</label>
        <input type="text" id="year" value={this.state.year} onChange={this.handleyear.bind(this)}/>
        <label htmlFor="dept">Select Department:</label>
        <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
        <label htmlFor="date">DOB</label>
        <input type="date" id="date" value={this.state.dob} onChange={this.handledob.bind(this)} />
        <label htmlFor="phn">Phone number</label>
        <input type="text" id="phn" value={this.state.phn} onChange={this.handlephn.bind(this)}/>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" value={this.state.add} onChange={this.handleadd.bind(this)} />
        <button class="btn btn-success" onClick={this.handlesubmit.bind(this)}>Add</button>
        </form> */}
        </div>
      </div>
      </div>
      </div>
      
    )
  }
}