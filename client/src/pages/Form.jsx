import React from 'react'
import {useState} from 'react'
import { render } from 'react-dom'

const Form = () => {
    const [regNo, setreg] = useState('')
    const [year, setyear] = useState("1st")
    const [sem, setsem] = useState("1")
    const [Data,setData] = useState('')
    const [visible,setvisible] = useState(0)
    const [keys,setkeys] = useState([])
 

    
    

    const handleSubmit = async(e) => {

        e.preventDefault();


        const res = await fetch('http://localhost:4040/stat',{
            method:'POST',
            headers: {
                 'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                regNo,
                year,
                sem
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
            console.log(data.result)
            setData(data.result)
            // Data.map(post => {
            //   console.log(post);
            // })
            setkeys(Object.keys(data.result))
            setvisible(1)
            setreg('')
            setsem("1")
            setyear("1st")
        }
        else{
            alert(data.error)
        }
        
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
        Enter registration number:
        <input type="text" name="regn" value={regNo} onChange={(e) => setreg(e.target.value)}/>
      </label>
      <label >
        Enter the year
      <select value={year} onChange={(e) => setyear(e.target.value)} >
        <option value="1st">1</option>
        <option value="2nd">2</option>
        <option value="3rd">3</option>
        <option value="4th">4</option>
      </select>
      </label>
      <label>
        Enter the sem:
      <select value={sem} onChange={(e) => setsem(e.target.value)} >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      </label>
      <input type="submit" value="post" />
      </form>
      <ul>
        <li>{Data["sem"]}</li>
        <li>{Data["year"]}</li>
        <li>{Data["regNo"]}</li>
            {
              keys.forEach((key, index) => {
                <ul>
                  <li>
                    {key}
                  </li>
                  <li>
                    {Data[key]}
                  </li>
                </ul>
              })
            }
      </ul>
    </div>
  )
}

export default Form