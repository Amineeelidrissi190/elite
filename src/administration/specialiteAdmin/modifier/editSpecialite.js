import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditSpecialite() {
    const [nom_specialité, setNom_specialité] = useState("");
    const [video_intro, setVideo_intro] = useState(null);
    const [description, setDescription] = useState("");
    const [emploi_sp, setEmploi_sp] = useState(null);
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [specialiteData, setSpecialiteData] = useState({});

    const navigate = useNavigate();
    const { id_specialite } = useParams();

    useEffect(() => {
        fetchSpecialite();
    }, []);

    const fetchSpecialite = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://127.0.0.1:8000/api/specialite/${id_specialite}`);
            const specialiteData = response.data;
            setSpecialiteData(specialiteData);
            setNom_specialité(specialiteData.nom_specialité);
            setVideo_intro(specialiteData.video_intro);
            setPrice(specialiteData.price);
            setDescription(specialiteData.description);
            setEmploi_sp(specialiteData.emploi_sp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleVideoChange = (e) => {
        setVideo_intro(e.target.files[0]);
    };

    const handlePhotoChange = (e) => {
        setEmploi_sp(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("nom_specialité", nom_specialité);
        formData.append("video_intro", video_intro);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("emploi_sp", emploi_sp);

        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.post(`http://127.0.0.1:8000/api/specialite/${id_specialite}`, formData);

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
                console.log(error);
            }
        }
    };

    return (
        <div className="w-full md:mx-4 mx-0">
            <form className="flex flex-col items-center justify-center w-full p-2 space-y-5 rounded-lg" method="post" onSubmit={handleSubmit}>
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                    <h1 className="text-sm">Categories</h1>
                    <input type="submit" value="Edit" className="text-yellow-400 hover:underline cursor-pointer"/>
                </div>
                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Category :</label>
                        <div className="md:w-10/12 w-full">
                            <input
                                type="text"
                                name="nom_specialité"
                                onChange={(e) => setNom_specialité(e.target.value)}
                                value={nom_specialité}
                                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                            />
                            {errors.nom_specialité && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                    {errors.nom_specialité[0]}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Price :</label>
                        <div className="md:w-10/12 w-full">
                            <input
                                type="text"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                            />
                            {errors.price && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                    {errors.price[0]}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Video :</label>
                        <div className="md:w-10/12 w-full space-y-1">
                            <div className="flex flex-col border rounded-lg items-center justify-center">
                                <div className="flex justify-center w-full md:h-64 h-40">
                                    {video_intro && (
                                        <video controls>
                                            <source src={typeof video_intro === 'string' ? `http://127.0.0.1:8000/storage/videos/specialities/${video_intro}` : URL.createObjectURL(video_intro)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                                <div className="md:p-1 p-0 w-full">
                                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                        <p className="text-xs md:text-sm">Select a video:</p>
                                        <label htmlFor="videoInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                    </div>
                                    <input type="file" id="videoInput" className="hidden" name="video_intro" onChange={handleVideoChange} />
                                </div>
                            </div>
                            {errors.video_intro && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.video_intro[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Schedule :</label>
                        <div className="md:w-10/12 w-full space-y-1">
                            <div className="flex flex-col border rounded-lg items-center justify-center">
                                <div className="flex justify-center w-full md:h-64 h-40">
                                    {emploi_sp && (
                                        <img src={typeof emploi_sp === 'string' ? `http://127.0.0.1:8000/storage/photos/specialities/${emploi_sp}` : URL.createObjectURL(emploi_sp)} alt="Specialite Image" />
                                    )}
                                </div>
                                <div className="md:p-1 p-0 w-full">
                                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                        <p className="text-xs md:text-sm">Select a file:</p>
                                        <label htmlFor="emploiInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                    </div>
                                    <input type="file" id="emploiInput" className="hidden" name="emploi_sp" onChange={handlePhotoChange} />
                                </div>
                            </div>
                            {errors.emploi_sp && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.emploi_sp[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description :</label>
                        <div className="md:w-10/12 w-full">
                        <input
                                type="text"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                            />
                            {errors.description && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                    {errors.description[0]}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
