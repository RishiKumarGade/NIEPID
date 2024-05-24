import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentHistory(params) {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const navigate = useNavigate();
  const username  = pathname.split("/")[pathname.split("/").length - 1]

  const [history,setHistory] = useState();

  const [UInfo, setUInfo] = useState(null);
    async function getStudentBasicDetails(){
      await axios.post("http://localhost:4000/getstudentbasicdetails",{username:username},{
        withCredentials: true
    }).then(res=>{
      if(!res.data.status){
        navigate('/class')
      }else{
        setUInfo(res.data.data)
      }
    })
    }
    async function getStudentHistory(){
        await axios.post('http://localhost:4000/getstudenthistory',{username:username},{
          withCredentials:true
        }).then(res=>{
          setHistory(res.data.data)
        })
    }

    useEffect(()=>{
      getStudentBasicDetails();
    },[])

  return (
    <div>

      {/* TODO code to nicely show the bargraph and history */}

    </div>
  )
}

export default StudentHistory