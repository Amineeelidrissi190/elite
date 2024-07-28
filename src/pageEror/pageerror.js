import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import notfound from "../fitness/notfound.png"
export default function Pageerror() {
    const [sorry, setSorry] = useState("");
    const [hidden, sethidden] = useState(false);
    useEffect(() => {
        const textUse404 = "Oops! It appears you've taken a wrong turn in the gym maze. Don't worry, every fitness journey has its detours. Let's recalibrate those coordinates and get you back on track to crushing your goals! Stay focused, stay determined, and let's navigate our way back to the heart of our fitness community.";
        const interval = setInterval(() => {
            if (sorry.length < textUse404.length) {
                setSorry((prevSorry) => prevSorry + textUse404[prevSorry.length]);
            } else {
                clearInterval(interval);
                sethidden(true) 
            }
        }, 35);
       
         return () => clearInterval(interval);
        
    }, [sorry]);

    return (
        <div className='w-full min-h-screen flex md:flex-row flex-col-reverse py-10 items-center justify-center md:space-x-28 space-x-0'>
            <div className='flex md:w-2/6 w-full flex-col md:space-y-6 space-y-1 items-center justify-center'>
                <p className='md:text-9xl text-5xl font-bold'>4<span className='text-red-700'>0</span>4</p>
                <p className='md:text-lg text-sm md:mx-0 mx-5'>{sorry}</p> 
                {hidden?<Link to="/" className='bg-red-700 hover:bg-white md:mx-0 mx-5 text-black px-5 py-3 rounded-lg self-start'>Back home page</Link>:<p></p>}
            </div>
            <div className='md:w-2/6 w-1/2'>
            <img src={notfound} className=''/>
            </div>
            
            
        </div>
    );
}
