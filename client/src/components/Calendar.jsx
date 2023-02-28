import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {useState,useEffect} from 'react'
import axios from 'axios'


const Calendar = () => {
            const [data,setdata] = useState([{}]);

            useEffect(() => {
               axios.post('https://backendapi-899p.onrender.com/cal')
              .then((res)=>{
                 setdata(res.data.data);
              })
              return () => {
                console.log("hel");
              };
            }, []);
            
  return (
    <section className="user1" id="user1">
      <h1 style={{color:'#fff'}}>Event Calendar</h1>
      <div className="container2">
      <FullCalendar
        plugins={[ dayGridPlugin , timeGridPlugin, listPlugin ]}
        initialView="dayGridMonth"
        // dateClick={handleDateClick}
        events={data}
      />
      </div>
      
    </section>
  )
}

export default Calendar;
