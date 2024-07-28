import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import plus from "../../../fitness/plus.png"
import Swal from "sweetalert2"
export default function CreateTrainies() {
    const [trainies, settrainies] = useState({
        nom_personal_tr: "",
        description: "",
        prix: ""
    })
    const [errors, setErrors] = useState(null); // État pour stocker les erreurs
    const navigate = useNavigate()
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.post("http://127.0.0.1:8000/api/personal_trainies", trainies)
            navigate("/AfficherTrainiesAdmin")
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
                showConfirmButton: true,
              });

        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }

        }

    }
    return <div className="w-full md:mx-4 mx-0">
        <form action="" method="post" onSubmit={handleAdd} className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
            <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                <h1 className="text-sm">Personal trainings</h1>
                <input type="submit" value="Add" className="text-green-600 hover:underline py-2 cursor-pointer" />



            </div>
            <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Name :</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" name="nom_personal_tr" placeholder="Name pers.trainies" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => {
                            settrainies({ ...trainies, nom_personal_tr: e.target.value })
                        }} />
                        {errors && errors.nom_personal_tr && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.nom_personal_tr[0]}</p>}


                    </div>

                </div>
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description :</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" name="description" placeholder="Description" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => {
                            settrainies({ ...trainies, description: e.target.value })
                        }} />
                        {errors && errors.description && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.description[0]}</p>}


                    </div>

                </div>
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Price :</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" name="prix" placeholder="price" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => {
                            settrainies({ ...trainies, prix: e.target.value })
                        }} />
                        {errors && errors.prix && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.prix[0]}</p>}


                    </div>

                </div>
            </div>
        </form>
    </div>
}