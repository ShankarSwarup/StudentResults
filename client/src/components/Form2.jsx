import React from 'react'
import "../css/Forms.css"
import { useState } from 'react'
// import { Navigate } from "react-router-dom";
import { useNavigate} from 'react-router-dom'




const Form2 = () => {
    const [reg,setreg] = useState("");
    const [pass,setpass] = useState("");
    const [password,setpassword] = useState("");
    const [lreg,setlreg] = useState("");
    const [lpassword,setlpassword] = useState("");
    const navigate = useNavigate();

    const toggleForm1 = () => {
        var container = document.querySelector('.container2');
        container.classList.toggle('active')
    }

    const handlesubmit1 = async(e) => {
        e.preventDefault();

        console.log(reg,pass,password);

        const res = await fetch('https://vignancalendar.herokuapp.com/change',{
            method:'POST',
            headers: {
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                reg,
                pass,
                password
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
            setreg("");
            setpassword("");
            setpass("");
            alert(data.message);
        }
        else{
            alert(data.message);
        }
    }

    const handlesubmit = async(e) => {
        e.preventDefault();

        console.log(lreg,lpassword);

        const res = await fetch('https://vignancalendar.herokuapp.com/login',{
            method:'POST',
            headers: {
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                lreg,
                lpassword
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
            setlreg("");
            setlpassword("");
            navigate("/cal");

            // <Navigate to="/cal"  />
        }
        else{
            alert(data.message);
        }
    }
    
  return (
    <section className="user1" id="user1">
        <div className="container2">
            <div className="user signinBx">
                <div className="imgBx">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_uqsv3ztj.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}  loop  autoplay></lottie-player>
                </div>
                <div className="formBx">
                    <form onSubmit={handlesubmit}>
                        <h2>User Sign In</h2>
                        <input type="text" value={lreg} onChange={event => setlreg(event.target.value)} placeholder="Registartion id" id="Email"/>
                        <input type="text" value={lpassword} onChange={event => setlpassword(String(event.target.value))} placeholder="Password" id="Password"/>
                        <input type="submit" id="signin" value='Sign in'/>
                        <p className="signup">Do you want to change the password ?<a  onClick={toggleForm1}>Change Password</a></p>
                    </form>
                </div>
            </div>
            <div className="user signupBx">
                <div className="formBx">
                    <form onSubmit={handlesubmit1}>
                        <h2>Change Password</h2>
                        <input type="text"  value={reg} onChange={event => setreg(event.target.value)}  placeholder="Registration id"/>
                        <input type="text"  value={pass} onChange={event => setpass(event.target.value)} placeholder="Old Password" id="password"/>
                        <input type="text"  value={password} onChange={event => setpassword(event.target.value)} placeholder="New Password"/>
                        <input type="submit" id="signup" value='Change'/>
                        <p className="signup">Already have an account ?<a  onClick={toggleForm1}>Sign in</a></p>
                    </form>
                </div>
                <div className="imgBx">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ncpnijkz.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}   loop  autoplay></lottie-player>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Form2