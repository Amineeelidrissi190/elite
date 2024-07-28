import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "../ScrollAnimation";
import dtoffreimg from "../fitness/dtoffreimg.png";
import checked from "../fitness/checked.png";
import React from 'react';
import Swal from 'sweetalert2';

export default function DetailOffres(props) {
  const { id_offre } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(true);
  const [offres, setOffres] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [inscription_offres, setInscriptionOffres] = useState({
    paiement: '',
    users_id: user.users_id,
    offres_id: id_offre,
  });

  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      if (user) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/offres/${id_offre}`);
        setOffres(response.data);
        setLoading(false)
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
      const res = await axios.post('http://127.0.0.1:8000/api/inscription_offrecontroller/', inscription_offres);
      console.log(res.data);
      setMessage(res.data.message);
      Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      navigate("/")

    } catch (error) {
      console.error(error);

      // SweetAlert2 error alert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error processing your request.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const Back = () => {
    navigate("/");
  }

  return (
    <ScrollAnimation>
      <div className="flex items-center justify-center min-h-screen w-full">
        <img src={dtoffreimg} className="h-screen w-screen" alt="Offer Image" />
        <div className="absolute top-0 h-full left-0 flex items-center w-full justify-center">
          {Loading?(
          <div className="loader">
          <div data-glitch="Loading..." className="glitch">Loading...</div>
        </div>
          ):(
            <div className="flex flex-col bg-red-700 bg-opacity-70 border md:w-1/2 w-full md:p-5 p-2 space-y-3 mx-2 rounded-lg">
              <div className="font-bold md:text-2xl text-lg text-center">{offres.nom_offre}</div>
              <div className="text-center font-bold md:text-2xl text-lg">{offres.date_offre_deb}</div>
              <div className="description">{offres.date_offre_fin}</div>
              <div className="md:text-base text-xs">{offres.content_offre}</div>
              <form method="post" onSubmit={handleSubmit} className="w-full flex flex-col">
                <label>
                  <input
                    type="radio"
                    name="paiement"
                    value="Cachant delivrer"
                    onChange={(e) => {
                      setInscriptionOffres({ ...inscription_offres, paiement: e.target.value });
                    }}
                  />
                  Cachant delivrer
                </label>
                <label>
                  <input
                    type="radio"
                    value="Chez ELite"
                    name="paiement"
                    onChange={(e) => {
                      setInscriptionOffres({ ...inscription_offres, paiement: e.target.value });
                    }}
                  />
                  Chez Elite
                </label>
                <button className="bg-black w-full px-5 py-3 text-center rounded-lg" type="submit">
                  Buy Now
                </button>
              </form>
            </div>
          )}
            
        </div>
      </div>
    </ScrollAnimation>
  );
}
