import React, { useEffect } from 'react'
import Admin from '../admin'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ScrollAnimation from "../../ScrollAnimation";
import Chatcommand from './Chatcommand';

export default function ProductHomeAdmin() {
    const [datacommand, setdatacommand] = useState([]);
    const [total, setTotal] = useState("");
    const [Error, setError] = useState(false);
    const [Loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        response()
        totalcount()
    }, [])
    const response = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/Lastscommand")
            setdatacommand(res.data)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setError(true)
        }

    }
    const totalcount = async () => {
        try {
            const res1 = await axios.get("http://127.0.0.1:8000/api/Total")
            setTotal(res1.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full'>
            <Admin />
            <div className='w-full px-2 space-y-2'>
                <div className='flex-col flex md:flex-row items-center justify-center md:space-x-2 space-x-0 md:space-y-0 space-y-2'>
                    <div className='md:w-1/2 w-full text-white bg-black h-56 rounded-lg'>
                        <Chatcommand />
                    </div>
                    <div className='bg-slate-950 h-56 rounded-lg flex flex-col space-y-5 items-center justify-center md:w-1/2 w-full'>
                        {Loading ? (
                            <div className='flex items-center justify-center'>
                                <div className="loader">
                                    <div data-glitch="Loading..." className="glitch">Loading...</div>
                                </div>

                            </div>
                        ) : Error ? (
                            <div className="loader">
                                <div data-glitch="Failed to fetch data" className="glitch">Failed to fetch data</div>
                            </div>

                        ) : datacommand.length > 0 ? (
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-2xl font-bold'>Total orders</p>
                                <p className='text-2xl font-bold'>{total}</p>
                            </div>

                        ) : (
                            <div className='flex w-full h-full items-center text-center justify-center'>No data available</div>
                        )
                        }

                    </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center rounded-lg space-y-1'>

                    <div className='w-full flex items-center justify-between rounded-lg bg-slate-950 px-3 py-3 text-sm'>
                        <p>Last orders</p>
                        <Link to="/Affichercommand" className='hover:underline'>View all</Link>
                    </div>
                    <div className='space-y-3 rounded-lg overflow-x-auto overflow-y-hidden block w-full'>
                        <table className='bg-slate-950 rounded-lg w-full text-black'>
                            <thead className="bg-slate-800 border-b rounded-lg whitespace-nowrap text-center border-black">
                                <tr className='w-full rounded-lg'>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Client name</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Phone number</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">email</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Product name</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Price</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Delete</th>
                                </tr>
                            </thead>
                            <tbody className='rounded-lg'>
                                {datacommand && datacommand.map((e, ind) => (
                                    <tr key={ind} className="text-center text-white text-sm">
                                        <td className="md:w-1/6 min-w-[120px] font-normal py-2  ">{e.user.client ? e.user.client.name_client : " not available"}</td>
                                        <td className="md:w-1/6 min-w-[120px] font-normal  ">{e.user.client ? e.user.client.numero_tel : " not available"}</td>
                                        <td className="md:w-1/6 min-w-[120px] font-normal  ">{e.user ? e.user.email : "not available"}</td>
                                        <td className="md:w-1/6 min-w-[120px] font-normal  ">{e.produit ? e.produit.nom_produit : "not available"}</td>
                                        <td className="md:w-1/6 min-w-[120px] font-normal  ">{e.produit ? e.produit.prix : "not available"}</td>
                                        <td className="md:w-1/6 min-w-[120px] font-normal  "><Link to={`/Deletecommand/${e.id}`} className="text-red-600 hover:underline">

                                            Delete
                                        </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                </div>

            </div>
        </div>
    )
}
