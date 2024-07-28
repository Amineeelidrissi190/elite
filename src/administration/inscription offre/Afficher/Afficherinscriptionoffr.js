import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Afficherinscriptionoffr() {
    const [datainscription, setdatainscription] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInscriptions();
    }, []);

    const fetchInscriptions = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("http://127.0.0.1:8000/api/inscription_offrecontroller");
            setdatainscription(res.data);
        } catch (errors) {
            console.error(errors);
        }
    };

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
                axios.delete(`http://127.0.0.1:8000/api/inscription_offrecontroller/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The inscription has been deleted.',
                            'success'
                        );
                        fetchInscriptions();
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
    };

    return (
        <div className="w-screen h-full p-2 flex flex-col overflow-x-hidden space-y-2">
            <div className='w-full px-5 bg-slate-950 py-5 text-white rounded-lg'>
                <h1 className='px-2 text-sm'>Inscription Offers</h1>
            </div>
            <div className="space-y-3 overflow-x-auto overflow-y-hidden block w-full rounded-lg">
                <table className="w-full bg-slate-950">
                    <thead className="bg-slate-800 border-b w-full text-center whitespace-nowrap border-black">
                        <tr className="w-full text-sm">
                            <th className='md:w-1/5 min-w-[120px] font-normal text-white'>Client Name</th>
                            <th className='md:w-1/5 min-w-[120px] font-normal text-white'>Phone Number</th>
                            <th className='md:w-1/5 min-w-[120px] font-normal text-white'>Email</th>
                            <th className='md:w-1/5 min-w-[120px] font-normal text-white'>Offer</th>
                            <th className='md:w-1/5 min-w-[120px] font-normal text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datainscription.map((e, ind) => (
                            <tr key={ind} className="border-b border-slate-900 text-sm text-center text-white">
                                <td className="md:w-1/5 min-w-[120px] py-2 font-normal text-white">
                                    {e.user?.client?.name_client || "No client name available"}
                                </td>
                                <td className="md:w-1/5 min-w-[120px] font-normal text-white">
                                    {e.user?.client?.numero_tel || "No phone number available"}
                                </td>
                                <td className="md:w-1/5 min-w-[120px] font-normal text-white">
                                    {e.user?.email || "User email not available"}
                                </td>
                                <td className="md:w-1/5 min-w-[120px] font-normal text-white">
                                    {e.offre?.nom_offre || "Offer name not available"}
                                </td>
                                <td className="md:w-1/5 min-w-[120px] font-normal text-white">
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
