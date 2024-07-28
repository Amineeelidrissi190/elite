import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function AfficherEvent() {
    const [sta, setsta] = useState([]);

    useEffect(() => {
        handle();
    }, []);

    const handle = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("http://127.0.0.1:8000/api/event");
            setsta(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure to delete this event?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.delete(`http://127.0.0.1:8000/api/event/${id}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'The event has been deleted.',
                            'success'
                        );
                        handle(); // Refresh the data after deletion
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the event.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-full mx-2 flex my-2 flex-col overflow-x-hidden space-y-2">
            <div className="w-full flex justify-between px-5 bg-slate-950 py-5 text-white rounded-lg">
                <h1 className="px-2 text-sm">Event</h1>
                <Link to="/AddEvent" className="text-green-600 hover:underline text-sm">Add Event</Link>
            </div>
            <div className="overflow-x-auto block rounded-lg">
                <table className="w-full text-white bg-slate-950 rounded-lg">
                    <thead className="bg-slate-800 w-full border-b text-center border-black rounded-lg">
                        <tr className="w-full rounded-lg text-sm">
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Image Event</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Event</th>
                            <th className="font-normal md:w-2/6 min-w-[320px] text-white">Event Description</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Date Event</th>
                            <th className="font-normal md:w-1/6 min-w-[320px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="rounded-lg">
                        {sta.length > 0 && sta.map((e, ind) => (
                            <tr key={ind} className="border-b text-sm border-slate-900">
                                <td className="md:w-1/6 min-w-[120px] flex items-center justify-center">
                                    <img src={`http://127.0.0.1:8000/storage/photos/Event/${e.image_Event}`} className="h-28 w-28 py-2" alt="Event" />
                                </td>
                                <td className="text-center md:w-1/6 min-w-[120px]">{e.nom_event}</td>
                                <td className="md:w-2/6 min-w-[320px] text-xs px-3">{e.description_event}</td>
                                <td className="text-center md:w-1/6 min-w-[120px]">{e.date_event}</td>
                                <td className="text-center md:w-1/6 min-w-[120px]">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => handleDelete(e.id)} className="flex items-center justify-center space-x-2 hover:underline rounded-lg text-red-700">
                                            <p>Delete</p>
                                        </button>
                                        <Link to={`/EditEvent/${e.id}`} className="flex items-center justify-center space-x-2 hover:underline rounded-lg text-yellow-400">
                                            <p>Edit</p>
                                        </Link>
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
