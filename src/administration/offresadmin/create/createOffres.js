import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import plus from "../../../fitness/plus.png"
import Swal from "sweetalert2"
export default function CreateOffres() {
  const [specialite, setspecialite] = useState([])
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null); // État pour stocker les erreurs

  const [offres, setoffres] = useState({
    nom_offre: "",
    date_offre_deb: "",
    date_offre_fin: "",
    content_offre: "",
    specialite_id: "",
  })
  const respon = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/specialite");
      const res1 = response.data;
      setspecialite(res1);
      if (res1.length > 0 && !offres.specialite_id) {
        setoffres({ ...offres, specialite_id: res1[0].id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    respon()
    // handlesubmit()

  }, [])


  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.post("http://127.0.0.1:8000/api/offres", offres);
      navigate("/AfficheOffresAdmin")                
      Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
          showConfirmButton: true,
        });


    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }

  }
  return (
    <div className="w-full md:mx-4 mx-0">
      <form method="post" onSubmit={handlesubmit} className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-sm">Offers</h1>
          <input type="submit" value="Add" className="text-green-600 hover:underline py-2 cursor-pointer" />
        </div>
        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-baseline space-y-2">
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Offer :</label>
            <div className="md:w-10/12 w-full">
              <input type="text" name="nom_offre" placeholder="nom d'offre" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => { setoffres({ ...offres, nom_offre: e.target.value }); }} />
              {errors && errors.nom_offre && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.nom_offre[0]}</p>} {/* Afficher l'erreur nom_event */}


            </div>
          </div>

          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Date debut :</label>
            <div className="md:w-10/12 w-full">
              <input className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" type="date" name="date_offre_deb" placeholder="Date debut d'offre" onChange={(e) => { setoffres({ ...offres, date_offre_deb: e.target.value }); }} />
              {errors && errors.date_offre_deb && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.date_offre_deb[0]}</p>} {/* Afficher l'erreur nom_event */}

            </div>

          </div>

          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Date fin :</label>
            <div className="md:w-10/12 w-full">
              <input type="date" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="date_offre_fin" placeholder="Date de fin d'offre"
                onChange={(e) => {
                  setoffres({ ...offres, date_offre_fin: e.target.value });
                }}
              />
              {errors && errors.date_offre_fin && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.date_offre_fin[0]}</p>} {/* Afficher l'erreur nom_event */}

            </div>


          </div>
          <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Specialitie :</label>
            <div className="md:w-10/12 w-full">
            <select className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
              name="specialite_id"
              onChange={(e) => {
                setoffres({ ...offres, specialite_id: e.target.value });
              }}
              defaultValue={offres.specialite_id}
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
                name="content_offre" placeholder="content Offre" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                onChange={(e) => {
                  setoffres({ ...offres, content_offre: e.target.value });
                }}
              />
              {errors && errors.content_offre && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.content_offre[0]}</p>} {/* Afficher l'erreur nom_event */}


            </div>

          </div>



        </div>

      </form>
    </div>

  );



}