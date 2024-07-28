import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Afficherinscription_event() {
    const [eventin, seteventin] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEventInscriptions();
    }, []);

    const fetchEventInscriptions = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("http://127.0.0.1:8000/api/inscription_event");
            seteventin(res.data);
        } catch (errors) {
            console.error(errors);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure you want to delete this inscription?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/inscription_event/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The inscription has been deleted.',
                            'success'
                        );
                        fetchEventInscriptions(); // Refresh data after deletion
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the inscription.',
                            'error'
                        );
                    });
            }
        });
    }

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full px-5 bg-slate-950 py-5 text-white rounded-lg'>
                <h1 className='px-2 text-sm text-white'>Event Inscriptions</h1>
            </div>
            <div className="space-y-3 rounded-lg overflow-x-auto overflow-y-hidden block w-full">
                <table className='bg-slate-950 w-full text-black'>
                    <thead className="bg-slate-800 border-b whitespace-nowrap text-center border-black">
                        <tr className="w-full text-sm">
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Client Name</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Phone Number</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Email</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Inscription Date</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Event Date</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventin && eventin.map((e, ind) => (
                            <tr key={ind} className="text-center text-white text-sm">
                                <td className="md:w-1/6 min-w-[120px] py-2 font-normal">{e.user.client ? e.user.client.name_client : 'Not available'}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.user.client ? e.user.client.numero_tel : 'Not available'}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.user ? e.user.email : 'Not available'}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.created_at ? e.created_at : 'Not available'}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.events ? e.events.date_event : 'Not available'}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">
                                    <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">
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
