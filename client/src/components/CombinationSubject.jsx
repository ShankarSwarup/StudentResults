import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CombinationSubject extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      dep:'',
      sems:'',
      sub:'',
      dept:[],
      sem:[],
    }
  }

 async getOptions(){
    const res = await axios.post('https://vignanminiproject.herokuapp.com/sub')
    const data = res.data.data
    const depths = ['CSE','ECE','EEE','CIVIL','MECH','ECM','IT']
    const sem = ['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2']
    const options = data.map(d => ({
      "value" : d.Subject,
      "label" : d.Subject

    }))

    const depts = depths.map(d=>({
        "value":d,
        "label":d
    }))

    const sems = sem.map(d=>({
        "value":d,
        "label":d
    }))
    this.setState({selectOptions: options,dept:depts,sem:sems})

  }


  handleChange(e){
   this.setState({sub:e.value})
  }

  handledept(e){
    this.setState({dep:e.value})
   }

   handlesem(e){
    this.setState({sems:e.value})
   }

   handlesubmit(e){
       e.preventDefault();
      
       const subject = this.state.sub;
       const depart = this.state.dep;
       const semister = this.state.sems;

       axios.post('https://vignanminiproject.herokuapp.com/mansub',{
        subject,
        depart,
        semister
       }).then(res=>alert(res.data.message)).catch(err=> console.log(err))
   }

   handlesubmits(e){
    e.preventDefault();
   
    const subject = this.state.sub;
    const depart = this.state.dep;
    const semister = this.state.sems;

    axios.post('https://vignanminiproject.herokuapp.com/mannsub',{
     subject,
     depart,
     semister
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
      <div id="stad" className="shadow-sm p-3 mb-5 bg-white rounded">
      <h1>Add / Delete Subject Combination</h1>
      <div id="head">
      <h3>Add / Delete Subject Combination</h3>
      </div>
      <div id="forms">
      <form>
      <div class="form-group">
          <label for="exampleFormControlSelect2">Select Subject:</label>
          <Select autocomplete="off" class="form-control" id="exampleFormControlSelect2"  placeholder="Select Subject" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput4">Select Department:</label>
          <Select autocomplete="off" class="form-control" id="exampleFormControlInput4" placeholder="Select Department" options={this.state.dept} onChange={this.handledept.bind(this)} />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput5">Select Sem:</label>
          <Select autocomplete="off" class="form-control" id="exampleFormControlInput5" placeholder="Select Sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
        </div>
        <button className="btn btn-success" style={{marginRight:'10px'}} onClick={this.handlesubmit.bind(this)}>Add</button>
        <button className="btn btn-danger" style={{marginLeft:'10px'}} onClick={this.handlesubmits.bind(this)}>Delete</button>
      </form>
      </div>
    </div>
    </div>
        </div>
      
      // <div>
      //   <h1>Add / Delete Subject Combination</h1>
      //   <h2>Add / Delete Subject Combination</h2>
      //   <form >
      //   <label htmlFor="sub">Select Subject:</label>
      //   <Select id="sub" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
      //   <label htmlFor="dept">Select Department:</label>
      //   <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
      //   <label htmlFor="sem">Select Sem:</label>
      //   <Select id="sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
      //   <button onClick={this.handlesubmit.bind(this)}>Add</button>
      //   <button onClick={this.handlesubmits.bind(this)}>Delete</button>
      //   </form>
      // </div>
    )
  }
}