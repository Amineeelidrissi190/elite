import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AfficherClient() {
    const [datacoach, setDatacoach] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/client");
            setDatacoach(res.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are sure to delete this client?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/client/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The client has been deleted.',
                            'success'
                        );
                        fetchClients(); // Actualiser les données après suppression
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the client.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full text-white flex justify-between px-5 bg-slate-950 py-5 rounded-lg'>
                <h1 className='px-2 text-sm'>Clients</h1>
                <Link to="/AddClient" className="text-green-600 text-sm hover:underline">Add client</Link>
            </div>
            <div className="space-y-3 overflow-x-auto rounded-lg overflow-y-hidden block w-full">
                <table className="w-full bg-slate-950 text-center">
                    <thead className="bg-slate-800 border-b whitespace-nowrap text-center text-sm border-black">
                        <tr className="text-sm">
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Client name</th>
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Age</th>
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Phone number</th>
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Specialitie</th>
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Email</th>
                            <th className='md:w-1/6 min-w-[120px] font-normal text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {datacoach.map((client) => (
                            <tr key={client.id} className="text-white border-b text-sm border-slate-900">
                                <td className="md:w-1/6 min-w-[120px] font-normal py-3">{client.name_client}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{client.age_client}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{client.numero_tel}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">
                                    <div className="flex items-center justify-center space-x-1">
                                        {client.specialite.slice(0, 5).map((specialite, i) => (
                                            <div key={i}>{specialite}</div>
                                        ))}
                                    </div>
                                </td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">
                                    {client.user && client.user.email ? client.user.email : ""}
                                </td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">
                                    <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
