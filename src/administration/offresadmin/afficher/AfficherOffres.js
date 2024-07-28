import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AfficherOffre() {
    const [offres, setoffres] = useState([]);

    useEffect(() => {
        res1();
    }, []);

    const res1 = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/offres");
            setoffres(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure to delete this offer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/offres/${id}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'The offer has been deleted.',
                            'success'
                        );
                        res1(); 
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There are clients registered for this offer.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-full mx-2 flex my-2 flex-col overflow-x-hidden space-y-2">
            <div className="w-full text-white flex justify-between px-5 bg-gray-950 py-5 rounded-lg">
                <h1 className='px-2 text-sm'>Offers</h1>
                <Link to="/CreateOffresAdmin" className="text-green-600 hover:underline text-sm">Add offer</Link>
            </div>
            <div className="overflow-x-auto block rounded-lg">
                <table className="w-full text-white bg-slate-950 rounded-lg">
                    <thead className="bg-slate-800 w-full border-b text-center border-black rounded-lg">
                        <tr>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">nom offre</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">date debut offre</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">date fin offre</th>
                            <th className="font-normal md:w-2/6 min-w-[320px] text-white">contenu offre</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offres.length > 0 && offres.map((e, ind) => (
                            <tr key={ind} className="border-b p-2 text-sm border-slate-900">
                                <td className="md:w-1/6 min-w-[120px] font-normal text-center py-2 text-white">{e.nom_offre}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-center text-white">{e.date_offre_deb}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal text-center text-white">{e.date_offre_fin}</td>
                                <td className="md:w-2/6 min-w-[320px] font-normal text-xs text-white py-2">{e.content_offre}</td>
                                <td className="md:w-1/6 min-w-[120px]">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                                        <Link to={`/editOffresAdmin/${e.id}`} className="text-yellow-400 hover:underline">Edit</Link>
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
