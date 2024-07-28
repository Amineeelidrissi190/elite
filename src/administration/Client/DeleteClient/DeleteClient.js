import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function DeleteClient(){
    const {id_client}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        handle()
    },[])
    const handle=async()=>{
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res=await axios.delete(`http://127.0.0.1:8000/api/client/${id_client}`)
        navigate("/AfficherClient")

    }
}