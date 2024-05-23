import axios from 'axios'
import React from 'react'

function Test() {
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:4000/test',{data:"test"}).then(res=>{
            console.log(res);
        })
    }

    
  return (
    <div>
        <form onSubmit={handleSubmit}>
                <button type="submit" >heh</button>
        </form>
    </div>
  )         
}

export default Test