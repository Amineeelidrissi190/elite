import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Admin from '../admin';

export default function ConnectedUsers() {
    const [connectedUsers, setConnectedUsers] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        try {

            const res = await axios.get("http://127.0.0.1:8000/api/connected-users");
            setConnectedUsers(res.data);
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="space-y-2 rounded-lg mx-1 overflow-x-auto overflow-y-hidden block w-full">
            <Admin/>
            <div className='flex flex-col space-y-2 items-center rounded-lg justify-center w-full'>
            <div className='w-full px-5 bg-slate-950 py-4 text-white rounded-lg'>
                <h1 className='px-2 text-sm'>Connected users</h1>
            </div>
            <div className="space-y-3 overflow-x-auto rounded-lg overflow-y-hidden block w-full">
            <table className=" bg-slate-950 w-full rounded-lg">
                <thead className="bg-slate-800 text-sm rounded-lg border-b whitespace-nowrap text-center border-black">
                    <tr>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Name</th>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Phone Numbers</th>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Email</th>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Speciality</th>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Age</th>
                        <th className="md:w-1/6 min-w-[120px] font-normal text-white">Role</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(connectedUsers) && connectedUsers.map((user, index) => (
                        user.role === "client" ? (
                            <tr key={index} className="text-center text-white text-sm">
                                <td className="md:w-1/6 min-w-[120px] font-normal py-4">{user.name_client}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.numero_tel}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.email}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.specialite}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.age_client}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.role}</td>
                            </tr>
                        ) : user.role === "admin" ? (
                            <tr key={index} className="text-center text-white text-sm">
                                <td className="md:w-1/6 min-w-[120px] font-normal py-4">{user.nom_admin} {user.prenom_admin}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.phone_admin}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.email}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">----</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">----</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{user.role}</td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>


            </div>
            
            </div>
            
        </div>
    )
}
