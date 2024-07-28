import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
export const Offer = ({ loading, offer }) => {
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
    return <div className='flex space-x-3'>

        {offer.map((e, ind) => {
            return <div key={ind} className="flex flex-col bg-red-700 bg-opacity-70 md:w-80 w-62 md:p-5 p-2 rounded-lg" ><div className="">
                <div className="font-bold text-2xl text-center">{e.nom_offre}</div>
                <div className="font-bold text-2xl text-center">from {e.date_offre_deb}</div>
                <div className="font-bold text-2xl text-center">to {e.date_offre_fin}</div>
                <p className="text-sm font-semibold">{e["content_offre"].substring(0, 170)}{/* Truncate description to 100 characters */}
                    {e["content_offre"].length > 170 && <span>...</span>}
                </p>
            </div>
                {user?
                <Link to={`/DetailOffres/${e.id}`} className="bg-black text-center hover:bg-white hover:text-black px-5 py-3 rounded-lg">
                    Read more
                </Link>
                 : 
                <Link to="/join" className="bg-black hover:bg-white hover:text-black text-center px-5 py-3 rounded-lg">
                    Read more
                </Link>
                 }
                </div>
        })}
    </div>
}