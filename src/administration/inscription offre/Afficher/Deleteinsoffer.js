import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Deleteinsoffer() {
    const {id} = useParams()
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const navigate = useNavigate()

    useEffect(()=>{
        delet()
    },[])
    const delet = async () => {
        await axios.delete(`http://127.0.0.1:8000/api/inscription_offrecontroller/${id}`)
        navigate("/Afficherinscriptionoffr")
        
    }


}
