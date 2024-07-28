import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function DeleteOffres(){
    const {id_offre}=useParams()
    const navigate=useNavigate();
    console.log(id_offre)
    const [data, setData] = useState({})
    useEffect(() => {
        deletoffre()
    }, [])
    
    const deletoffre = async () => {
        try{
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.delete(`http://127.0.0.1:8000/api/offres/${id_offre}`)
            setData(response.data)
            navigate("/AfficheOffresAdmin")
            // console.log(data)
  

        }
        catch(error){
            // console.log(error)
        }


    }
    
}