import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AfficherAdmin() {
    const [dataadmin, setDataAdmin] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/admin");
            setDataAdmin(res.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure you want to delete this admin?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/admin/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted !',
                            'The admin has been deleted.',
                            'success'
                        );
                        fetchAdmins(); // Actualiser les données après suppression
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the admin.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full flex justify-between px-5 bg-slate-950 py-5 text-white rounded-lg'>
                <h1 className='px-2 text-sm'>Admins</h1>
                <Link to="/AddAdmin" className="text-green-600 text-sm hover:underline">Add Admin</Link>
            </div>
            <div className="space-y-3 overflow-x-auto rounded-lg overflow-y-hidden block w-full">
                <table className="w-full bg-slate-950 text-center">
                    <thead className="bg-slate-800 border-b whitespace-nowrap border-black">
                        <tr className="text-sm">
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Image Admin</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Nom Admin</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Prénom Admin</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Numéro de Téléphone</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Email</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {dataadmin.map((admin) => (
                            <tr key={admin.id} className="text-sm border-b text-white border-slate-900">
                                <td className="py-2 flex items-center justify-center">
                                    <img src={`http://127.0.0.1:8000/storage/photos/admin/${admin.image_admin}`} className="w-32 h-32 rounded-lg" alt="Admin" />
                                </td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-white">{admin.nom_admin}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-white">{admin.prenom_admin}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-white">{admin.phone_admin}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-white">{admin.user.email}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-white">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button onClick={() => handleDelete(admin.id)} className="text-red-600 hover:underline">Delete</button>
                                        <Link to={`/EditAdmin/${admin.id}`} className="text-yellow-400 hover:underline">Edit</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
