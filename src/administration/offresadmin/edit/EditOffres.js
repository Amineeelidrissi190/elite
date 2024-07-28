import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import pen from "../../../fitness/pen.png"
import Swal from "sweetalert2";
export default function EditOffres() {
  const { id_offre } = useParams();
  const navigate = useNavigate();
  const [specialite, setSpecialite] = useState([]);
  const [nom_offre, setNomOffre] = useState("");
  const [date_offre_deb, setDateOffreDeb] = useState("");
  const [date_offre_fin, setDateOffreFin] = useState("");
  const [specialite_id, setSpecialiteId] = useState("");
  const [content_offre, setContentOffre] = useState("");
  const [errors, setErrors] = useState(null); // État pour stocker les erreurs
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const fetchData = async () => {
    try {

      const response = await axios.get(`http://127.0.0.1:8000/api/offres/${id_offre}`);
      const data = response.data;
      setNomOffre(data.nom_offre);
      setDateOffreDeb(data.date_offre_deb);
      setDateOffreFin(data.date_offre_fin);
      setContentOffre(data.content_offre);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecialites = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/specialite");
      const data = response.data;
      setSpecialite(data);
      if (data.length > 0 && !specialite_id) {
        setSpecialiteId(data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id_offre]);

  useEffect(() => {
    fetchSpecialites();
  }, []);

  const handlePut = async (e) => {
    e.preventDefault();

    const updatedOffre = {
      nom_offre,
      date_offre_deb,
      date_offre_fin,
      specialite_id,
      content_offre,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/offres/${id_offre}`, updatedOffre);
      navigate("/AfficheOffresAdmin");
      Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
          showConfirmButton: true,
        });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full md:mx-4 mx-0">
      <form onSubmit={handlePut} className="flex flex-col items-center justify-center w-full p-2 space-y-5 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-lg">Offers</h1>
          <input type="submit" value="Edit" className="text-yellow-400 hover:underline cursor-pointer" />

        </div>
        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Offer :</label>
            <div className="md:w-10/12 w-full">
              <input
                type="text"
                name="nom_offre"
                value={nom_offre}
                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => setNomOffre(e.target.value)}
              />
              {errors && errors.nom_offre && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.nom_offre[0]}</p>} {/* Afficher l'erreur nom_event */}

            </div>

          </div>
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Date debut :</label>
            <div className="md:w-10/12 w-full">
              <input
                type="date"
                name="date_offre_deb"
                value={date_offre_deb}
                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => setDateOffreDeb(e.target.value)}
              />
              {errors && errors.date_offre_deb && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.date_offre_deb[0]}</p>} {/* Afficher l'erreur nom_event */}


            </div>

          </div>
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Date fin :</label>
            <div className="md:w-10/12 w-full">
              <input
                type="date"
                name="date_offre_fin"
                value={date_offre_fin}
                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => setDateOffreFin(e.target.value)}
              />
              {errors && errors.date_offre_fin && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.date_offre_fin[0]}</p>} {/* Afficher l'erreur nom_event */}


            </div>

          </div>
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">specialitie :</label>
            <div className="md:w-10/12 w-full" >
              <select
                name="id_specialite"
                value={specialite_id}
                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => setSpecialiteId(e.target.value)}
              >
                {specialite.map((e, ind) => (
                  <option value={e.id} key={ind}>
                    {e.nom_specialité}
                  </option>
                ))}
              </select>

            </div>

          </div>
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Content :</label>
            <div className="md:w-10/12 w-full">
              <input
                type="text"
                name="content_offre"
                value={content_offre}
                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => setContentOffre(e.target.value)}
              />
              {errors && errors.content_offre && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.content_offre[0]}</p>} {/* Afficher l'erreur nom_event */}


            </div>

          </div>


        </div>

      </form>
    </div>
  );
}
