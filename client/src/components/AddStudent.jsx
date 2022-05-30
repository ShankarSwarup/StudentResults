import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
       
       axios.post('https://vignancalendar.herokuapp.com/addstud',{
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
        <h1>Student Admission</h1>
        <h2>Fill the Student info</h2>
        <form >
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" value={this.state.name} onChange={this.handlename.bind(this)}/>
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
        <button onClick={this.handlesubmit.bind(this)}>Add</button>
        </form>
         <Link to="/studentdet" className="link">Upload Through Excel</Link>
      </div>
    )
  }
}