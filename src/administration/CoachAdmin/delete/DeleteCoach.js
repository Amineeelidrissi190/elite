import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function DeleteCoach(){
    const { id_coach } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState({})
    useEffect(() => {
        delet()
    }, [])
    const delet = async (e) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.delete(`http://127.0.0.1:8000/api/coach/${id_coach}`)
        if (response){
            setData(response.data)
        }
        navigate("/AfficherCoach")
  

    }
}