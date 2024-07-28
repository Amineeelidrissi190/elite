import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import deleteicon from "../../../fitness/deleteicon.png";
import editic from "../../../fitness/editic.png";

export default function AfficherTrainiesAdmin() {
    const [sta, setsta] = useState([]);

    useEffect(() => {
        handle();
    }, []);

    const handle = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("http://127.0.0.1:8000/api/personal_trainies");
            setsta(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure to delete this personal training?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/personal_trainies/${id}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'The personal training has been deleted.',
                            'success'
                        );
                        handle(); // Refresh the data after deletion
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the personal training.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-full mx-2 flex my-2 flex-col overflow-x-hidden space-y-2">
            <div className="w-full flex justify-between px-5 bg-slate-950 py-5 text-white rounded-lg">
                <h1 className='px-2 text-sm'>Personal trainies</h1>
                <Link to="/CreateTrainies" className="text-green-600 hover:underline text-sm">Add Trainies</Link>
            </div>
            <div className="overflow-x-auto block rounded-lg">
                <table className="w-full text-white bg-slate-950 rounded-lg">
                    <thead className="bg-slate-800 text-sm border-b text-center border-black">
                        <tr>
                            <th className="md:w-1/6 min-w-[120px] font-normal">nom personal training</th>
                            <th className="md:w-1/6 min-w-[320px] font-normal">description</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal">prix</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal">Action</th>
                        </tr>
                    </thead>
                    <tbody className="p-2">
                        {sta.length > 0 && sta.map((e, ind) => (
                            <tr key={ind} className="border-b p-2 text-sm border-slate-900">
                                <td className="md:w-1/6 min-w-[120px] font-normal text-center">{e.nom_personal_tr}</td>
                                <td className="md:w-1/6 min-w-[320px] font-normal py-2 text-xs">{e.description}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-center">{e.prix}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                                        <Link to={`/UpdateTrainies/${e.id}`} className="text-yellow-400 hover:underline">Edit</Link>
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
