import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SubjectList extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      dep:'',
      sems:'',
      dept:[],
      sem:[],
      i:0,
    }
  }

 async getOptions(){
    const depths = ['CSE','ECE','EEE','CIVIL','MECH','ECM','IT']
    const sem = ['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2']

    const depts = depths.map(d=>({
        "value":d,
        "label":d
    }))

    const sems = sem.map(d=>({
        "value":d,
        "label":d
    }))
    this.setState({dept:depts,sem:sems})

  }



  handledept(e){
    this.setState({dep:e.value})
   }

   handlesem(e){
    this.setState({sems:e.value})
   }

   handlesubmit(e){
       e.preventDefault();
      
       const depart = this.state.dep;
       const semister = this.state.sems;

       axios.post('https://vignanminiproject.herokuapp.com/findsub',{
        depart,
        semister
       }).then(res=>this.setState({selectOptions:res.data.data})).catch(err=> console.log(err))
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
      <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Subject Combination info</h1>
      <div id="head">
      <h3>View Subjects Combination info</h3>
      </div>
      <div id="forms">
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput4">Select Department:</label>
          <Select class="form-control" placeholder="Select Department" id="exampleFormControlInput4"  options={this.state.dept} onChange={this.handledept.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput5">Select Sem:</label>
          <Select class="form-control" placeholder="Select Sem" id="exampleFormControlInput5" options={this.state.sem} onChange={this.handlesem.bind(this)} />
        </div>
        <button className="btn btn-success" style={{marginBottom:'20px'}}onClick={this.handlesubmit.bind(this)}>Check</button>
      </form>
      </div>
      <div id='tabl'>
      <table className="table table-bordered table-striped table-hover">
      <thead className="thead-light">
          <tr>
          <th scope="col">Subject Name</th>
          <th scope="col">Department</th>
          <th scope="col">Semister</th>
          </tr>
      </thead>
      <tbody>
      {
            this.state.selectOptions.map(d=>{
                return(
                    <tr key={this.state.selectOptions.indexOf(d)}>
                    {/* <th scope="row">{this.setState.i}</th> */}
                    <td>{d}</td>
                    <td>{this.state.dep}</td>
                    <td>{this.state.sems}</td>
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
      //   <h1>Subjects Combination info</h1>
      //   <h2>View Subjects Combination info</h2>
      //   <form >
      //   <label htmlFor="dept">Select Department:</label>
      //   <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
      //   <label htmlFor="sem">Select Sem:</label>
      //   <Select id="sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
      //   <button onClick={this.handlesubmit.bind(this)}>Check</button>
      //   </form>
      //   <div>
      //   {
      //        this.state.selectOptions.map(d=>{
      //           return(
      //               <p>{d}</p>
      //           )
      //       })
      //   }
      //   </div>
      // </div>
    )
  }
}