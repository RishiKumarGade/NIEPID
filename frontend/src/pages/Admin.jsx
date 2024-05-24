import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


function Admin() {

    const [isTeacher,setIsTeacher] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [term,setTerm] = useState();
    const [year,setYear] = useState();
    const [group,setGroup] = useState('');

  
    const handleChange = (event) => {
      setGroup(event.target.value);
    };
  
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);




  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin/",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          toast.error(data.message);
          navigate("/");
        } 
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);





  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        setUploadStatus('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      let response
      if(isTeacher){
         response = await axios.post('http://localhost:4000/addteachers', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
            
          });
    
      }else{
         response = await axios.post('http://localhost:4000/addstudents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
        
      });

      }
      if (response) navigate('/admin') 
      
      setUploadStatus('File uploaded successfully');
    } catch (error) {
      setUploadStatus('Error uploading file');
      alert(error);
    }
  };

  async function initTermYear(e){
    e.preventDefault();
    await axios.post("http://localhost:4000/inittermyear",{term:term,year:year,group:group},{withCredentials:true}).then(res=>{
      console.log(res.data)
    })
  }
  return (
    <div >
        <h1>uploading for { isTeacher ? "teachers" : "Students"}  </h1>
        <button onClick={(e)=>{e.preventDefault();setIsTeacher(!isTeacher)}} > change to  { !isTeacher ? "teachers" : "Students"} </button>
    <div>
      <h2>Register</h2>
      <form onSubmit={handleUpload}>
      <div className="mb-3">
          <label htmlFor="professordata">
            <strong>Upload { isTeacher ? "teachers" : "Students"}  Data xlsx file</strong>
          </label>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </div>
        <button  type="submit" >
          Register 
        </button>
        <p>{uploadStatus}</p>
        </form>        
    </div>

    <form onSubmit={initTermYear}>
    <select id="options" value={group} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="PRIMARY">PRIMARY</option>
      </select>
    <input onChange={e=>{setTerm(e.target.value)}} value={term} placeholder='term' id="numberInput" type="number" min="0" max="3" required/>
    <input onChange={e=>{setYear(e.target.value)}} value={year} placeholder='year' id="numberInput" type="number" min="1" max="3" required/>
        <button type="submit">Submit</button>
      </form>

  </div>
  )
}

export default Admin