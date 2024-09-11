import React, { useEffect, useState } from 'react';
import panierbg from '../fitness/panierbg.png';
import ScrollAnimation from '../ScrollAnimation';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./panier.css"
export default function ReservationsPanier() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get('http://127.0.0.1:8000/api/commandclient');
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    // Calculer la somme des prix
    const totalPrix = data.reduce((sum, item) => sum + parseFloat(item.prix), 0);

    return (
        <ScrollAnimation>
            <div className='w-full relative h-screen flex items-center justify-center bg-cover bg-center'>
                <img src={panierbg} className='w-full h-full object-cover absolute top-0 left-0 z-0' alt='Panier Background' />
                <div className="absolute md:w-4/6 w-11/12 h-3/4 rounded-lg bg-black bg-opacity-70 border border-red-600 p-8">
                        <div className="mb-8 space-x-8 bg-transparent text-white border-2 border-red-700 rounded-md focus:ring-opacity-50 transition duration-200 ease-in-out px-4 py-2">
                        <Link to="/Panier" className="bg-transparent text-white hover:border-b border-red-700">Orders</Link>
                            <Link to="/ReservationsPanier" className="bg-transparent text-white hover:border-b border-red-700">Reservations</Link>
                            <Link to="/OffersPanier" className="bg-transparent text-white hover:border-b border-red-700">Offers inscriptions</Link>
                            <Link to="/EventsPanier" className="bg-transparent text-white hover:border-b border-red-700">Events inscriptions</Link>
                        </div>
                        
                    
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left border border-red-600 rounded-lg'>
                            <thead className='bg-black bg-opacity-70 border-b-2 border-red-600 rounded-t-lg'>
                                <tr>
                                    <th className='py-4 text-sm font-semibold text-center text-white'>Product Name</th>
                                    <th className='py-4 text-sm font-semibold text-center text-white'>Product Price</th>
                                    <th className='py-4 text-sm font-semibold text-center text-white'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='bg-black bg-opacity-70'>
                                {data.length > 0 ? data.map((e, ind) => (
                                    <tr key={ind} className='border-b last:border-b-0 border-red-600'>
                                        <td className='py-4 text-center text-white'>{e.nom_produit}</td>
                                        <td className='py-4 text-center text-white'>{e.prix} MAD</td>
                                        <td className='py-4 text-center text-white'><span className='bg-red-700 rounded-lg px-1 py-1 text-sm'>Pending</span></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className='py-5 text-center text-gray-400'>No data available</td>
                                    </tr>
                                )}
                                {data.length > 0 && (
                                    <tr className='bg-red-600 rounded-b-lg'>
                                        <th colSpan="2" className='py-4 text-right font-bold text-white'>Total:</th>
                                        <td className='py-4 text-white font-bold'>{totalPrix.toFixed(2)} MAD</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ScrollAnimation>
    );
}
