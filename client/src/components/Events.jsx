import React from 'react';
import {useState} from 'react';

const Event = () => {
  const [Subject,setsubject] = useState('');
  const [StartTime,setstart] = useState('');
  const [Place,setPlace] = useState('');

  const handlesubmit = async(e) => {
    e.preventDefault();
 
        const rest = await fetch('https://backendapi-899p.onrender.com/events',{
            method:'POST',
            headers: {
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Subject,
                StartTime,
                Place
            })
        })

        const datas = await rest.json()
        if (datas.status==='ok'){
            setsubject('');
            setstart('');
            setPlace('');
            alert("successful");
        }
        else
        {
            alert(datas.message);
        }
  }
  
  return (
    <section className="user1" id="user1">
        <div className="container2">
            <div className="user signinBx">
                <div className="imgBx">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_h9rxcjpi.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}  loop  autoplay></lottie-player>
                </div>
                <div className="formBx">
                    <form onSubmit={handlesubmit}>
                    <h2>Event Details</h2>
                    <label htmlFor="subject">Event :</label>
                    <input type="text" id="subject" value={Subject} onChange={event => setsubject(event.target.value)} placeholder="Enter Event Name" style={{marginBottom:'20px'}}/>
                    <label htmlFor="start">Event Date :</label>
                    <input type="date"  id="start" value={StartTime} onChange={event => setstart(String(event.target.value))}  />
                    <label htmlFor="place">Event Place:</label>
                    <input type="text" id="place" value={Place} onChange={event=>setPlace(event.target.value)} placeholder="Enter Event Place"></input>
                    <input type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Event