import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function CreateSpecialite() {
    const navigate = useNavigate();
    const [nomSpecialite, setNomSpecialite] = useState('');
    const [videoIntro, setVideoIntro] = useState(null);
    const [description, setDescription] = useState('');
    const [emploiSp, setEmploiSp] = useState(null);
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const formData = new FormData();
            formData.append('nom_specialité', nomSpecialite);
            formData.append('video_intro', videoIntro);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('emploi_sp', emploiSp);
            const res = await axios.post("http://127.0.0.1:8000/api/specialite", formData);


            if (res.data.errors) {
                setErrors(res.data.errors);
            } else {
                navigate("/specialitie");
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                    showConfirmButton: true,
                  });
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="w-full md:mx-4 mx-0">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                    <h1 className="text-sm text-white">Categories</h1>
                    <input type="submit" value="Add" className="text-green-600 py-2 hover:underline cursor-pointer" />
                </div>
                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                    <div className="w-full flex flex-col items-center justify-center space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Categorie :</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="nom_specialité"
                                    value={nomSpecialite}
                                    onChange={(e) => setNomSpecialite(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Categorie name"
                                />
                                {errors.nom_specialité && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.nom_specialité[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description :</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    maxLength="468"
                                    placeholder="Description"
                                />
                                {errors.description && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.description[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Price :</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Price"
                                />
                                {errors.price && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.price[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Video :</label>
                            <div className="md:w-10/12 w-full space-y-1">
                                <div className="flex flex-col border rounded-lg items-center justify-center">
                                    <div className="flex justify-center w-full md:h-64 h-40">
                                        {videoIntro && (
                                            <video controls src={URL.createObjectURL(videoIntro)} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                        )}
                                    </div>
                                    <div className="md:p-1 p-0 w-full">
                                        <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                            <p className="text-xs md:text-sm">Select a video:</p>
                                            <label htmlFor="videoInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                        </div>
                                        <input type="file" id="videoInput" className="hidden" name="video_intro" onChange={(e) => setVideoIntro(e.target.files[0])} />
                                    </div>
                                </div>
                                {errors.video_intro && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.video_intro[0]}</p>
                                )}
                            </div>
                        </div>
                    </div>

                   

                   
                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Schedule :</label>
                            <div className="md:w-10/12 w-full space-y-1">
                                <div className="flex flex-col border rounded-lg items-center justify-center">
                                    <div className="flex justify-center w-full md:h-64 h-40">
                                        {emploiSp && (
                                            <img src={URL.createObjectURL(emploiSp)} alt="Selected File" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                        )}
                                    </div>
                                    <div className="md:p-1 p-0 w-full">
                                        <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                            <p className="text-xs md:text-sm">Select a file:</p>
                                            <label htmlFor="emploiInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                        </div>
                                        <input type="file" id="emploiInput" className="hidden" name="emploi_sp" onChange={(e) => setEmploiSp(e.target.files[0])} />
                                    </div>
                                </div>
                                {errors.emploi_sp && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.emploi_sp[0]}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
