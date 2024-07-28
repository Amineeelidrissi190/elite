import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Deleteinscription_event() {
    const {id_eventpivot}=useParams()
    // const[data,setdata]=useState({})
    const navigate=useNavigate();
    useEffect(()=>{
        handle()
    },[])
    const handle=async()=>{
        const res=await axios.delete(`http://127.0.0.1:8000/api/inscription_event/${id_eventpivot}`)
        navigate("/Afficherinscription_event")

    }
}
