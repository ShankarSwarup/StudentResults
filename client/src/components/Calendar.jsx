import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {useState,useEffect} from 'react'
import axios from 'axios'


const Calendar = () => {
            const [data,setdata] = useState([{}]);
            useEffect(()=>{
              axios.post('https://vignanminiproject.herokuapp.com/cal')
              .then((res)=>{
                 setdata(res.data.data);
              })
              .catch(()=>{
              });
            });
            const handleDateClick = (arg) => { 
              alert(arg.dateStr)
            }
            
  return (
    <section className="user1" id="user1">
      <h1 style={{color:'#fff'}}>Event Calendar</h1>
      <div className="container2">
      <FullCalendar
        plugins={[ dayGridPlugin , timeGridPlugin, listPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={data}
      />
      </div>
      
    </section>
  )
}

export default Calendar;
