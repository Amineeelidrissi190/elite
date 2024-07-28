import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import pen from "../../../fitness/pen.png"
import Swal from "sweetalert2";
export default function UpdateTrainies() {
    const { id_trainies } = useParams();
    const [errors, setErrors] = useState(null);
    const [st, setSt] = useState({
        nom_personal_tr: "",
        description: "",
        prix: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        handleGet();
    }, []);

    const handleGet = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/personal_trainies/${id_trainies}`);
            setSt({
                ...st,
                nom_personal_tr: res.data.nom_personal_tr,
                description: res.data.description,
                prix: res.data.prix
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.put(`http://127.0.0.1:8000/api/personal_trainies/${id_trainies}`, st);
            navigate("/AfficherTrainiesAdmin");
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
    };

    

    return (
        <div className="w-full md:mx-4 mx-0">
            <form onSubmit={handleUpdate} className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                    <h1 className="text-sm">Personal trainings</h1>
                        <input type="submit" value="Edit" className="py-2 text-yellow-400 hover:underline cursor-pointer"/> {/* Désactiver le bouton si le formulaire n'est pas valide */}
                        
                </div>

                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                    <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Name :</label>
                        <div className="md:w-10/12 w-full">
                        <input type="text" name="nom_personal_tr" value={st.nom_personal_tr} placeholder="Name pers.trainies" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => setSt({ ...st, nom_personal_tr: e.target.value })} />
                        {errors && errors.nom_personal_tr && <p className="text-red-700 text-sm w-fit self-start">{errors.nom_personal_tr[0]}</p>} {/* Afficher en rouge */}
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description :</label>
                        <div className="md:w-10/12 w-full">
                        <input type="text" name="description" value={st.description} placeholder="description" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => setSt({ ...st, description: e.target.value })} />
                        {errors && errors.description && <p className="text-red-700 text-sm w-fit self-start">{errors.description[0]}</p>} {/* Afficher en rouge */}

                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Price :</label>
                        <div className="md:w-10/12 w-full">
                        <input type="text" name="prix" value={st.prix} placeholder="price" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => setSt({ ...st, prix: e.target.value })} />
                        {errors && errors.prix && <p className="text-red-700 text-sm w-fit self-start">{errors.prix[0]}</p>} {/* Afficher en rouge */}


                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}