import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Link } from "react-router-dom";

export default class AddResults extends Component {

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
    const grade = ['O','A','B','C','D','E','F']

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
     
        axios.post('https://vignancalendar.herokuapp.com/findstudent',{
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


       axios.post('https://vignancalendar.herokuapp.com/findsub',{
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

    

    axios.post('https://vignancalendar.herokuapp.com/decres',{
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
        <h1>Declare Result</h1>
        <form >
        <label htmlFor="dept">Select Department:</label>
        <Select id="dept" options={this.state.dept} onChange={this.handledept.bind(this)} />
        <label htmlFor="sem">Select Semister:</label>
        <Select id="sem" options={this.state.sem} onChange={this.handlesem.bind(this)} />
        <label htmlFor="year">Select Graduation Year:</label>
        <input type="text" value={this.state.year} onChange={this.handleyear.bind(this)} />
        <button onClick={this.handledet.bind(this)}>Get Details</button>
        
        <div>
        <label htmlFor="Reg">Registration Number</label>
        <Select id="Reg" options={this.state.roll} onChange={this.handleroll.bind(this)} />
        {
          
          this.state.selectOptions.map(di=>{
            return(
                <div key={this.state.selectOptions.indexOf(di)}>
                <label htmlFor={di}>{di}</label>
                <Select id={di}  options={this.state.grad} onChange={(e)=> this.handlegrad(e,di)} />
                </div>
            )
          }) 
        }
        </div>
        <button onClick={this.handlesubmits.bind(this)}>Add Results</button>
        </form>

        <Link to="/results" className="link">Upload Through Excel</Link>
        <Link to="/supply" className="link" >Add Supply Results Here</Link>
      </div>
    )
  }
}