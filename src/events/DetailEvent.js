import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScrollAnimation from "../ScrollAnimation";
import Swal from 'sweetalert2';

export default function DetailEvent(props) {
  const { id_event } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [inscriptionEvent, setInscriptionEvent] = useState({
    id_user: user.users_id,
    id_event: id_event,
    paiement: ""
  });

  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/event/${id_event}`);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/inscription_event/", inscriptionEvent);
      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: 'Votre inscription à l\'événement a été effectuée avec succès!',
        showConfirmButton: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'inscription à l\'événement.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <ScrollAnimation>
      <div className="w-full min-h-screen my-6 md:my-0 flex md:flex-row flex-col items-center justify-center">
        {loading ? (
                    <div className="loader">
                    <div data-glitch="Loading..." className="glitch">Loading...</div>
                  </div>
        ) : (
          <div className='w-full flex md:flex-row flex-col items-center justify-center'>
            <div className="flex md:w-1/3 flex-col justify-center items-center">
              <img src={`http://127.0.0.1:8000/storage/photos/Event/${event.image_Event}`} alt="" />
              <div className="text-center mt-2 md:text-3xl text-xl font-bold text-red-700">{event.date_event}</div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="md:text-2xl text-xl font-bold text-white text-center">{event.nom_event}</div>
              <div className="md:text-lg text-xs p-3">{event.description_event}</div>
              <form method="post" onSubmit={handleSubmit} className="p-3 space-y-3 flex flex-col">
                <label>
                  <input
                    type="radio"
                    value="Chez Elite"
                    name="paiement"
                    onChange={(e) => {
                      setInscriptionEvent({ ...inscriptionEvent, paiement: e.target.value });
                    }}
                  />
                  Chez Elite
                </label>
                <button className="bg-red-700 w-full px-5 py-3 text-center rounded-lg">Buy Now</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
}
