import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function AfficherCoach() {
    const [datacoach, setDatacoach] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        fetchCoaches();
    }, []);

    const fetchCoaches = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/coach");
            setDatacoach(res.data);
        } catch (errors) {
            console.log(errors);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure to delete this coach?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/coach/${id}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'The coach has been deleted.',
                            'success'
                        );
                        fetchCoaches(); // Refresh the data after deletion
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the coach.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full flex justify-between px-5 bg-slate-950 py-5 text-white rounded-lg'>
                <h1 className='px-2 text-sm'>Coaches</h1>
                <Link to="/CreateCoach" className="text-green-600 hover:underline text-sm">Add Coach</Link>
            </div>
            <div className="space-y-3 overflow-x-auto rounded-lg overflow-y-hidden block w-full">
                <table className="w-full bg-slate-950">
                    <thead className="bg-slate-800 border-b w-full text-center whitespace-nowrap border-black">
                        <tr className="text-sm">
                            <th className="md:w-1/12 min-w-[120px] font-normal text-white">Image Coach</th>
                            <th className="md:w-1/12 min-w-[120px] font-normal text-white">Nom Coach</th>
                            <th className="md:w-1/12 min-w-[120px] font-normal text-white">Prenom Coach</th>
                            <th className="md:w-3/12 min-w-[300px] font-normal text-white">Description</th>
                            <th className="md:w-1/12 min-w-[120px] font-normal text-white">Phone Number</th>
                            <th className="md:w-1/12 min-w-[120px] font-normal text-white">Gmail</th>
                            <th className="md:w-3/12 min-w-[120px] font-normal text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datacoach.map((e, ind) => (
                            <tr key={ind} className="text-sm border-b text-white border-slate-900">
                                <td className='md:w-1/12 min-w-[120px] text-center font-normal text-white'>
                                    <img src={`http://127.0.0.1:8000/storage/photos/coach/${e.image_coach}`} className="w-32 h-32 object-cover rounded-lg" alt="Coach" />
                                </td>
                                <td className='md:w-1/12 min-w-[120px] text-center font-normal text-white'>{e.nom_coach}</td>
                                <td className='md:w-1/12 min-w-[120px] text-center font-normal text-white'>{e.prenom_coach}</td>
                                <td className='md:w-3/12 min-w-[300px] font-normal text-xs text-white'>{e.description}</td>
                                <td className='md:w-1/12 min-w-[120px] text-center font-normal text-white'>{e.phone_coach}</td>
                                <td className='md:w-1/12 min-w-[120px] text-center font-normal text-white'>{e.user.email}</td>
                                <td className='md:w-4/12 min-w-[120px] text-center font-normal text-white'>
                                    <div className="flex items-center justify-center space-x-1">
                                        <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                                        <Link to={`/UpdateCoach/${e.id}`} className="text-yellow-400 hover:underline">Edit</Link>
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
