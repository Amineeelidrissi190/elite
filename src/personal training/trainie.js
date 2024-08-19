import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
export const Trainie = ({personal,loading}) => {
    const user = localStorage.getItem('user');
    if (loading) {
        return <p className='text-center'>Loading...</p>;
    }
    return (
        <div className='flex items-center justify-center overflow-x-hidden w-full space-x-2'>
            {personal.map((e, ind) => {
                return <div key={ind} className="flex flex-col bg-red-700 bg-opacity-70 md:w-80 w-62 md:p-5 p-2 rounded-lg" ><div className="">
                    <div className="font-bold text-2xl text-center">{e.nom_personal_tr}</div>
                    <div className="text-center font-bold text-2xl">{e.prix} MAD</div>
                    <p className=" text-sm font-semibold">{e["description"].substring(0, 220)}{/* Truncate description to 100 characters */}
                        {e["description"].length > 220 && <span>...</span>}
                    </p>
                </div>

                    {user?<Link to={`/Detailtrainies/${e.id}`} className="bg-black text-center px-5 py-3 rounded-lg">
                        Read more
                    </Link>:<Link to="/join" className="bg-black text-center px-5 py-3 rounded-lg">
                        Read more
                    </Link>}</div>
            })}

        </div>
    )
}
