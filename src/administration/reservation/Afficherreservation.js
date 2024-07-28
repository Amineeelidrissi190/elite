import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Afficherreservation() {
    const [datareservation, setdatareservation] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/reservationcontroller");
            setdatareservation(res.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure you want to delete this reservation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/reservationcontroller/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The reservation has been deleted.',
                            'success'
                        );
                        fetchReservations(); // Refresh data after deletion
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the reservation.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full px-5 bg-slate-950 py-5 text-white rounded-lg'>
                <h1 className='px-2 text-sm'>Reservations</h1>
            </div>
            <div className="space-y-3 rounded-lg overflow-x-auto overflow-y-hidden block w-full">
                <table className="w-full bg-slate-950">
                    <thead className="bg-slate-800 border-b text-sm whitespace-nowrap text-center border-black">
                        <tr className="w-full">
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Client Name</th>
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Phone Number</th>
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Email</th>
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Personal Training</th>
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Price</th>
                            <th className="md:w-1/6 min-w-[80px] text-center font-normal text-white">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datareservation.map((e, ind) => (
                            <tr key={ind} className="border-b border-slate-900 text-sm">
                                <td className="md:w-1/6 text-center min-w-[80px] py-3 font-normal text-white">
                                    {e.user.client ? e.user.client.name_client : "Client name not available"}
                                </td>
                                <td className="md:w-1/6 text-center min-w-[80px] font-normal text-white">
                                    {e.user.client ? e.user.client.numero_tel : "Phone number not available"}
                                </td>
                                <td className="md:w-1/6 text-center min-w-[80px] font-normal text-white">
                                    {e.user ? e.user.email : "Email not available"}
                                </td>
                                <td className="md:w-1/6 text-center min-w-[80px] font-normal text-white">
                                    {e.personal ? e.personal.nom_personal_tr : "Personal training not available"}
                                </td>
                                <td className="md:w-1/6 text-center min-w-[80px] font-normal text-white">
                                    {e.personal ? e.personal.prix : "Price not available"}
                                </td>
                                <td className="md:w-1/6 text-center min-w-[80px] font-normal text-white">
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
