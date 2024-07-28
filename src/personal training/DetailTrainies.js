import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import checked from "../fitness/checked.png";
import ptrain from "../fitness/ptrain.png";
import ScrollAnimation from "../ScrollAnimation";
import React from 'react';
import Swal from 'sweetalert2';

export default function DetailTrainies(props) {
  const { id_trainies } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [personal_trainies, setPersonalTrainies] = useState({});
  const [loading, setloading] = useState(true);
  const [message, setMessage] = useState('');
  const [reservation, setReservation] = useState({
    paiement: '',
    id_user: user.users_id,
    id_personal_trainies: id_trainies,
  });

  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/personal_trainies/${id_trainies}`);
        setPersonalTrainies(response.data);
        setloading(false)
      } else {
        navigate('/join');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.post('http://127.0.0.1:8000/api/reservationcontroller/', reservation);
      setMessage(res.data.message);

      Swal.fire({
        icon: 'success',
        title: 'Réservation réussie',
        text: res.data.message,
        showConfirmButton: true,
      });
      navigate("/")

    } catch (error) {
      console.error(error);

      // Afficher une alerte SweetAlert2 pour l'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la réservation.',
        showConfirmButton: true,
      });
    }
  };

  const Back = () => {
    navigate("/")
  };

  return (
    <ScrollAnimation>
      <div className="flex w-full h-full relative min-h-screen items-center justify-center">
        <img src={ptrain} className="h-screen w-screen" alt="Personal Trainies" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {loading?(
                      <div className="loader">
                      <div data-glitch="Loading..." className="glitch">Loading...</div>
                    </div>
          ):(
            <div className="flex flex-col bg-red-700 bg-opacity-70 border md:w-1/2 w-11/12 md:p-5 p-1 space-y-3 mx-1 rounded-lg">
              <div className="">
                <div className="font-bold md:text-2xl text-lg text-center ">{personal_trainies.nom_personal_tr}</div>
                <div className="text-center font-bold md:text-2xl text-lg">{personal_trainies.prix}</div>
                <div className="md:text-base text-sm">{personal_trainies.description}</div>
              </div>

              <form method="post" onSubmit={handleSubmit} className="flex flex-col space-y-2 justify-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paiement"
                    value="Cachant delivrer"
                    onChange={(e) => {
                      setReservation({ ...reservation, paiement: e.target.value });
                    }}
                    className="w-4 h-4"
                  />
                  <p>Cachant delivrer</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Chez ELite"
                    name="paiement"
                    onChange={(e) => {
                      setReservation({ ...reservation, paiement: e.target.value });
                    }}
                    className="w-4 h-4"
                  />
                  <p>Chez Elite</p>
                </div>
                <button className="bg-black w-full py-3 text-center rounded-lg">Buy Now</button>
              </form>
            </div>
          )}
            
         
        </div>
      </div>
    </ScrollAnimation>
  );
}
