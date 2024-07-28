import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Deletecommand(){
    const {id_command}=useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        handle()
    },[])
    const handle=async()=>{
        const res=await axios.delete(`http://127.0.0.1:8000/api/commandecontroller/${id_command}`)
        // setdata(res.data)
        navigate("/Affichercommand")

    }
}