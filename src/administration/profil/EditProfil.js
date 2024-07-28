import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function EditProfil() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [nomAdmin, setNomAdmin] = useState(user.nom_admin);
    const [prenomAdmin, setPrenomAdmin] = useState(user.prenom_admin);
    const [phoneAdmin, setPhoneAdmin] = useState(user.phone_admin);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [imageAdmin, setImageAdmin] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const formData = new FormData();
            formData.append("_method", "PATCH");
            formData.append('nom_admin', nomAdmin);
            formData.append('prenom_admin', prenomAdmin);
            formData.append('phone_admin', phoneAdmin);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image_admin', imageAdmin);
            const res = await axios.post(`http://127.0.0.1:8000/api/updateprofilAdmin/${user.id_users}`, formData);
            if (res.data.errors) {
                setErrors(res.data.errors);
            } else {
                navigate("/profil")
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.message,
                    showConfirmButton: true,
                  });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
        }
    };

    return (
        <div className="w-full md:mx-4 mx-0">
            <form onSubmit={handleUpdateProfile} className="flex flex-col items-center justify-center w-full p-2 space-y-3 rounded-lg">
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                <img src={`http://127.0.0.1:8000/storage/photos/admin/${user.image_admin}`} className='h-12 w-12 bg-slate-500 object-cover rounded-full'/>
                    <input type="submit" value="Update" className="text-green-600 py-2 hover:underline cursor-pointer" />
                </div>
                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                    <div className="w-full flex flex-col items-center justify-center space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">First name:</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="prenom_admin"
                                    value={prenomAdmin}
                                    onChange={(e) => setPrenomAdmin(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="First name"
                                />
                                {errors.prenom_admin && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.prenom_admin[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Family name:</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="nom_admin"
                                    value={nomAdmin}
                                    onChange={(e) => setNomAdmin(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Family name"
                                />
                                {errors.nom_admin && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.nom_admin[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Phone number:</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="phone_admin"
                                    value={phoneAdmin}
                                    onChange={(e) => setPhoneAdmin(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Phone number"
                                />
                                {errors.phone_admin && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.phone_admin[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Email:</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Password:</label>
                            <div className="md:w-10/12 w-full">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex md:flex-row flex-col md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                            <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Image:</label>
                            <div className="md:w-10/12 w-full space-y-1">
                                <div className="flex flex-col border rounded-lg items-center justify-center">
                                    <div className="flex justify-center w-full md:h-64 h-40">
                                        {imageAdmin && (
                                            <img src={URL.createObjectURL(imageAdmin)} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                        )}
                                    </div>
                                    <div className="md:p-1 p-0 w-full">
                                        <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                            <p className="text-xs md:text-base">Select an image:</p>
                                            <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-base md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                        </div>
                                        <input type="file" id="imageInput" className="hidden" name="image_admin" onChange={(e) => setImageAdmin(e.target.files[0])} />
                                    </div>
                                </div>
                                {errors.image_admin && (
                                    <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.image_admin[0]}</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
