import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function Create() {
    
    const[task,setTask]=useState()
    const handleAdd=(e)=>{
        e.preventDefault();;
         axios.post('http://localhost:3001/add',{task:task})
         .then(result=>{
            location.reload()
         })
         .catch(err=>console.log(err))
            
         
    }
  return (
    <div className="create_form">
        <input type="text" name="" id="" placeholder='Enter Task'onChange={(e)=>{setTask(e.target.value)}} className='input'/>
        <button type='button' onClick={handleAdd}className='button'>Add</button>
    </div>
  )
}

export default Create