import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddGalerie() {
    const [picture, setPicture] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('picture', picture);
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/gallerie", formdata);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
                showConfirmButton: true,
            });
            navigate("/AfficherGallerie");
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
            console.log(error);
        }
    };

    return (
        <div className="w-full md:mx-4 mx-0">
            <form onSubmit={handleSubmit} method="post" className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                    <h1 className="text-sm">Gallery</h1>
                    <input type="submit" value="Add" className="text-green-600 hover:underline py-2 cursor-pointer" />
                </div>
                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-baseline space-y-2">
                    <div className="w-full flex md:flex-row flex-col md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Picture :</label>
                        <div className="md:w-10/12 w-full space-y-1">
                            <div className="flex flex-col border rounded-lg items-center justify-center">
                                <div className="flex justify-center w-full md:h-64 h-40">
                                    {picture && (
                                        <img src={URL.createObjectURL(picture)} alt="Selected File" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    )}
                                </div>
                                <div className="md:p-1 p-0 w-full">
                                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                        <p className="text-xs md:text-sm">Select a file:</p>
                                        <label htmlFor="pictureInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                    </div>
                                    <input type="file" id="pictureInput" className="hidden" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                                </div>
                            </div>
                            {errors.picture && (
                                <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.picture[0]}</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
