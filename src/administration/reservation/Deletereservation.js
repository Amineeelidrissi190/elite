import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Deletereservation(){
    const {id_reservation}=useParams()
    // const[data,setdata]=useState({})
    const navigate=useNavigate();
    useEffect(()=>{
        handle()
    },[])
    const handle=async()=>{
        const res=await axios.delete(`http://127.0.0.1:8000/api/reservationcontroller/${id_reservation}`)
        // setdata(res.data)
        navigate("/Afficherreservation")

    }
}