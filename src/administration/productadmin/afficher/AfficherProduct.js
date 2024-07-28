import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function AfficherProduct() {
    const [sta, setsta] = useState([]);

    useEffect(() => {
        handle();
    }, []);

    const handle = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/produit");
            setsta(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure to delete this product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/produit/${id}`)
                    .then(response => {
                        Swal.fire(
                            'Deleted!',
                            'The product has been deleted.',
                            'success'
                        );
                        handle(); // Refresh the data after deletion
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the product.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="w-full mx-2 flex my-2 flex-col overflow-x-hidden space-y-2">
            <div className="w-full text-white flex justify-between px-5 bg-gray-950 py-5 rounded-lg">
                <h1 className='px-2 text-sm'>Products</h1>
                <Link to="/AddProduct" className="text-green-600 hover:underline text-sm">Add product</Link>
            </div>
            <div className="overflow-x-auto block overflow-y-hidden rounded-lg">
                <table className="w-full text-white bg-slate-950 rounded-lg">
                    <thead className="bg-slate-800 w-full border-b text-center border-black whitespace-nowrap rounded-lg">
                        <tr className="w-full text-sm rounded-lg">
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">image product</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Product</th>
                            <th className="font-normal md:w-2/6 min-w-[120px] text-white">product description</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">price</th>
                            <th className="font-normal md:w-1/6 min-w-[120px] text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sta.length > 0 && sta.map((e, ind) => (
                            <tr key={ind} className="border-b border-slate-900 text-sm">
                                <td className="md:w-1/6 min-w-[120px]">
                                    <img src={`http://127.0.0.1:8000/storage/photos/product/${e.img_produit}`} className="w-48 h-36" alt="product" />
                                </td>
                                <td className="font-normal md:w-1/6 min-w-[120px] text-center text-white">{e.nom_produit}</td>
                                <td className="font-normal md:w-2/6 min-w-[320px] text-xs text-white">{e.desc_produit}</td>
                                <td className="font-normal md:w-1/6 min-w-[120px] text-white text-center">{e.prix}</td>
                                <td className="font-normal md:w-1/6 min-w-[120px] text-white">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                                        <Link to={`/UpdateProduct/${e.id}`} className="text-yellow-400 hover:underline">Edit</Link>
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
