import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Affichercommand() {
    const [datacommand, setdatacommand] = useState([]);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const navigate = useNavigate();

    useEffect(() => {
        fetchCommands();
    }, []);

    const fetchCommands = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/commandecontroller");
            setdatacommand(res.data);
        } catch (errors) {
            console.error(errors);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure you want to delete this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/commandecontroller/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The order has been deleted.',
                            'success'
                        );
                        fetchCommands(); // Refresh data after deletion
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the order.',
                            'error'
                        );
                    });
            }
        });
    }

    return (
        <div className="w-full h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className="w-full px-5 bg-slate-950 py-5 text-white rounded-lg">
                <h1 className='px-2 text-sm'>Orders</h1>
            </div>
            <div className="space-y-3 rounded-lg overflow-x-auto overflow-y-hidden block w-full">
                <table className="w-full text-sm bg-slate-950">
                    <thead className="bg-slate-800 border-b whitespace-nowrap text-center border-black">
                        <tr>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Client Name</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Phone Numbers</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Email</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Product Name</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Price</th>
                            <th className="md:w-1/6 min-w-[120px] font-normal text-white">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datacommand.map((e, ind) => (
                            <tr key={ind} className="text-center text-white text-sm">
                                <td className="md:w-1/6 min-w-[120px] font-normal py-2">{e.user.client ? e.user.client.name_client : "Not available"}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.user.client ? e.user.client.numero_tel : "Not available"}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.user ? e.user.email : "Not available"}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.produit ? e.produit.nom_produit : "Not available"}</td>
                                <td className="md:w-1/6 min-w-[120px] font-normal">{e.produit ? e.produit.prix : "Not available"}</td>
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
