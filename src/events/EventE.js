import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
export const EventE = ({ event, loading }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
    }, []);
    if (loading) {
        return <div className="loader">
        <div data-glitch="Loading..." className="glitch">Loading...</div>
     </div>
    }
    return (
        <div className="flex  justify-center items-center">
            {event.map((e, ind) => {
                return (
                    <div key={ind} className="flex flex-col relative bg-transparent space-y-1 w-full md:mx-5 mx-0 rounded-xl ">
                        <div className="w-full">
                            <img
                                src={`http://127.0.0.1:8000/storage/photos/Event/${e.image_Event}`}
                                alt={e.nom_event}
                                style={{ objectFit: "cover", opacity: 0.7 }}
                                className="rounded-lg w-80 h-72" />
                        </div>
                        <div className="absolute w-full h-full flex-col bg-black bg-opacity-30 top-0 left-0 flex items-center">
                            <div className="text-center mt-2 text-3xl font-bold text-white">{e.nom_event}</div>
                            <div className="text-center mt-2 text-xl font-bold text-white">{e.date_event}</div>
                            <div className="mx-2 lg:text-lg text-sm self-start text-white">{e["description_event"].substring(0, 220)}{/* Truncate description to 100 characters */}
                                {e["description_event"].length > 220 && <span>...</span>}</div>

                        </div>
                        {user?<Link to={`/DetailEvent/${e.id}`} className="bg-red-700 bg-opacity-70 text-black px-5 py-3 w-full z-10 text-center rounded-lg">Read more</Link>:<Link to="/join" className="bg-red-700 bg-opacity-70 text-black px-5 py-3 w-full z-10 text-center rounded-lg">Read more</Link>}
                        



                    </div>


                );
            })}
        </div>
    )
}
