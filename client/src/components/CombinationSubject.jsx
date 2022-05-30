import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

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
    const res = await axios.post('http://localhost:3001/sub')
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

       axios.post('http://localhost:3001/mansub',{
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

    axios.post('http://localhost:3001/mannsub',{
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
        <h1>Add / Delete Subject Combination</h1>
        <h2>Add / Delete Subject Combination</h2>
        <form >
        <label htmlFor="sub">Select Subject:</label>
        <Select id="sub" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        <label htmlFor="dept">Select Department:</label>
        <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
        <label htmlFor="sem">Select Sem:</label>
        <Select id="sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
        <button onClick={this.handlesubmit.bind(this)}>Add</button>
        <button onClick={this.handlesubmits.bind(this)}>Delete</button>
        </form>
      </div>
    )
  }
}