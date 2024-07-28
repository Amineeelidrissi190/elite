import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Deleteinscriptionoffr(){
    const {id_inscription}=useParams()
    // const[data,setdata]=useState({})
    const navigate=useNavigate();
    useEffect(()=>{
        handle()
    },[])
    const handle=async()=>{
        
        const res=await axios.delete(`http://127.0.0.1:8000/api/inscription_offrecontroller/${id_inscription}`)
        // setdata(res.data)
        navigate("/Afficherinscriptionoffr")

    }
}