import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class Supply extends Component {

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
    const sem = ['1-1','1-2','2-1','2-2','3-1','3-2','4-1','4-2']
    const grade = ['O','A','B','C','D','E','F','No Change']

    const gra = grade.map(d=>({
      "value":d,
      "label":d,
    }))

    const depts = depths.map(d=>({
        "value":d,
        "label":d
    }))

    const sems = sem.map(d=>({
        "value":d,
        "label":d
    }))
    this.setState({grad:gra,dept:depts,sem:sems})
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
   handlegrad(e,x){
       this.state.xi[x]=e.value;
      //  console.log(this.state.xi);
  }
   handledet(e){
     e.preventDefault();

     const depart = this.state.dep;
     const year = this.state.year;
     const semister = this.state.sems;
    //  const navigate = useNavigate();
           
    //  console.log(this.state.xi);
     
        axios.post('https://studentresults-5sr4.onrender.com/findstudent',{
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
          const dep = res.data.data.map(d=>({
            "value":d.Reg,
            "label":d.Reg
            }))
           this.setState({roll:dep});
          //  alert(res.data.message);
         }
        //  alert(res.data.message);
       }).catch(err=> console.log(err))


       axios.post('https://studentresults-5sr4.onrender.com/findsub',{
        depart,
        semister
       }).then(res=>{
         if(res.data.message!="Successful !")
         {
          // window.open("/addresults");
          alert(res.data.message);
         }
         else
         {
         this.setState({selectOptions:res.data.data})
        //  alert(res.data.message);
         }
        }).catch(err=> console.log(err))

   }

   handlesubmit(e){
       e.preventDefault();
      
       const depart = this.state.dep;
       const semister = this.state.sems;

    //    axios.post('http://localhost:3001/mansub',{
    //     subject,
    //     depart,
    //     semister
    //    }).then(res=>alert(res.data.message)).catch(err=> console.log(err))
   }

   handlesubmits(e){
    e.preventDefault();
   
    const depart = this.state.dep;
    const semister = this.state.sems;
    const year = this.state.year;
    const reg = this.state.reg;
    const re = this.state.xi;
    const a=[];
    for (const key in re) {
      const y={"sub":key,"grade":re[key]};
      a.push(y);
    }
    // console.log(a);

    

    axios.post('https://studentresults-5sr4.onrender.com/decres',{
     year,
     reg,
     a,
     depart,
     semister
    }).then(res=>alert(res.data.message)).catch(err=> console.log(err))
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
        <h1>Student Supply Results</h1>
        <div id="head">
        <h3>Fill the Results</h3>
        </div>
        <div id="forms">
        <form>
        <div class="form-group">
            <label for="exampleFormControlSelect2">Department</label>
            <Select autocomplete="off" class="form-control" id="exampleFormControlSelect2" options={this.state.dept} onChange={this.handledept.bind(this)} placeholder="Select Department" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Semister</label>
            <Select autocomplete="off" class="form-control" id="exampleFormControlInput1" placeholder="Select Semister" options={this.state.sem} onChange={this.handlesem.bind(this)} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput4">Graduation Year</label>
            <input autocomplete="off" type="text" className="form-control" id="exampleFormControlInput4" placeholder="Enter Graduation Year"  value={this.state.year} onChange={this.handleyear.bind(this)} />
          </div>
           <button className="btn btn-primary" style={{ marginBottom:'10px'}} onClick={this.handledet.bind(this)}>Get Details</button>
           <div class="form-group">
            <label for="exampleFormControlInput3">Registration Number</label>
            <Select autocomplete="off" class="form-control" id="exampleFormControlInput3" placeholder="Enter Graduation Year" options={this.state.roll} onChange={this.handleroll.bind(this)} />
          </div>
          <div class="form-group overflow-auto at">
          {
              this.state.selectOptions.map(di=>{
                return(
                    <div class="form-group overflow-auto" key={this.state.selectOptions.indexOf(di)}>
                    <label for="exampleFormControlInput4">{di}</label>
                    <Select autocomplete="off" class="form-control sel" id="exampleFormControlInput4"  options={this.state.grad} onChange={(e)=> this.handlegrad(e,di)} />
                    </div>
                )
              }) 
            }
          </div>
         <button className="btn btn-success" onClick={this.handlesubmits.bind(this)}>Modify Results</button>
        </form>
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
      //           <label htmlFor="op">{di}</label>
      //           <Select id="op"  options={this.state.grad} onChange={(e)=> this.handlegrad(e,di)} />
      //           </div>
      //       )
      //     }) 
      //   }
      //   </div>
      //   <button onClick={this.handlesubmits.bind(this)}>Modify Results</button>
      //   </form>
      // </div>
    )
  }
}