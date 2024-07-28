import React from 'react'
import Admin from '../admin'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChartTrainies from './ChartTrainies';
import axios from 'axios';

export default function PtrainiesHomeAdmin() {
    const [event, setEvent] = useState([]);
    const [total, setTotal] = useState("");
    const [Error, setError] = useState(false);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        getinscriptionLast();
    }, []);

    const getinscriptionLast = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get("http://127.0.0.1:8000/api/LastReservations");
            const res2 = await axios.get("http://127.0.0.1:8000/api/TrainiesCount");
            setTotal(res2.data);
            setEvent(res.data);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setError(true)
        }
    };

    return (
        <div className='w-full'>
            <Admin />
            <div className='w-full px-2 space-y-2'>
                <div className='flex-col flex md:flex-row items-center justify-center md:space-x-2 space-x-0 md:space-y-0 space-y-2'>
                    <div className='md:w-1/2 w-full text-white bg-black h-56 rounded-lg'>
                        <ChartTrainies />
                    </div>
                    <div className='bg-slate-950 h-56 rounded-lg flex flex-col space-y-5 items-center justify-center md:w-1/2 w-full'>
                        {Loading ? (
                            <div className="loader">
                                <div data-glitch="Loading..." className="glitch">Loading...</div>
                            </div>

                        ) : Error ? (
                            <div className="loader">
                                <div data-glitch="Error fetching data" className="glitch">Error fetching data</div>
                            </div>

                        ) : (
                            <div className='w-full h-full flex items-center justify-center flex-col'>
                                <p className='text-2xl font-bold'>Total inscriptions</p>
                                <p className='text-2xl font-bold'>{total}</p>
                            </div>

                        )}

                    </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center rounded-lg space-y-1'>
                    <div className='w-full flex items-center justify-between rounded-lg bg-slate-950 px-3 py-3 text-sm'>
                        <p>Last Pt.reservations</p>
                        <Link to="/Afficherreservation" className='hover:underline'>View all</Link>
                    </div>
                    <div className='space-y-3 rounded-lg overflow-x-auto overflow-y-hidden block w-full'>
                        <table className='bg-slate-950 rounded-lg w-full text-black'>
                            <thead className="bg-slate-800 border-b rounded-lg whitespace-nowrap text-center border-black">
                                <tr className='w-full rounded-lg'>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Client name</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Phone number</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">email</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">inscription date</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Pt.name</th>
                                    <th className="md:w-1/6 min-w-[120px] font-normal text-white ">Delete</th>
                                </tr>
                            </thead>
                            <tbody className='rounded-lg'>
                                {event && event.map((e, ind) => {
                                    return (
                                        <tr key={ind} className='text-center text-white text-sm'>
                                            <td className="md:w-1/6 min-w-[120px] py-2 font-normal">{e.user.client ? e.user.client.name_client : 'Not available'}</td>
                                            <td className="md:w-1/6 min-w-[120px] font-normal">{e.user.client ? e.user.client.numero_tel : 'Not available'}</td>
                                            <td className="md:w-1/6 min-w-[120px] font-normal">{e.user ? e.user.email : 'Not available'}</td>
                                            <td className="md:w-1/6 min-w-[120px] font-normal">{e.created_at ? e.created_at : 'Not available'}</td>
                                            <td className="md:w-1/6 min-w-[120px] font-normal">{e.personal ? e.personal.nom_personal_tr : 'Not available'}</td>
                                            <td className="md:w-1/6 min-w-[120px] font-normal"><Link to={`/Deleteinscription_event/${e.id}`} className="text-red-600 hover:underline">Delete</Link></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
