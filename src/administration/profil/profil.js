import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Profil() {
    const [user, setuser] = useState("")
    const [Loading, setLoading] = useState(true)
    const token = localStorage.getItem("token")
    useEffect(() => {
        handleget()
    }, [])
    const handleget = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.post('http://127.0.0.1:8000/api/auth/me')
            localStorage.setItem(user,res.data.user)
            setuser(res.data.user)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }

    }
    
    return (
        <div className="flex items-center h-screen w-full justify-center">
            <div className="md:w-1/2 lg:w-1/2 w-full">
                {Loading ? (
                    <div className="loader flex items-center justify-center">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                    </div>
                ) : (<div className="bg-slate-950 shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2 flex items-center justify-center">
                        <img src={`http://127.0.0.1:8000/storage/photos/admin/${user.image_admin}`} className='w-32 h-32 bg-slate-500 object-cover rounded-full' />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-white font-medium leading-8">{user.nom_admin} {user.prenom_admin}</h3>
                        <div className="text-center text-white text-xs font-semibold">
                            <p>{user.role}</p>
                        </div>
                        <table className="text-sm my-3 w-full">
                            <tbody className='text-center'>
                                <tr>
                                    <td className="px-2 py-2 text-white font-semibold">Phone :</td>
                                    <td className="px-2 py-2 text-white">{user.phone_admin}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-white font-semibold">Email :</td>
                                    <td className="px-2 py-2 text-white">{user.email}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center my-3">
                            <Link to="/EditProfil" className="text-xs text-red-700 font-bold hover:underline" href="#">Edit Profile</Link>
                        </div>

                    </div>
                </div>

                )}
            </div>
        </div>
    )
}
