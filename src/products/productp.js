import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
export const Productp = ({ product, loading }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
    }, []);
    if (loading) {
        return <div className="loader">
        <div data-glitch="Loading..." className="glitch">Loading...</div>
     </div>;
    }

    return (
        <ul className='flex items-center justify-center space-y-1 w-full space-x-2'>
            {product.map((e, ind) => (
                <li key={ind} className="flex flex-col bg-gradient-to-b from-red-700 via-transparent to-white w-60 p-3 space-y-1 rounded-xl product-card">
                    <div className="product-image">
                        <img
                            src={`http://127.0.0.1:8000/storage/photos/product/${e.img_produit}`}
                            alt={e.nom_produit}
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="text-center mt-2 text-xl font-bold ">{e.prix} MAD</div>
                    {user?<Link to={`/Detailproduct/${e.id}`} className="bg-black px-5 py-3 w-full text-center hover:bg-red-700 hover:text-black rounded-lg">Buy now</Link>:<Link to="/join" className="bg-black hover:bg-red-700 hover:text-black px-5 py-3 w-full text-center rounded-lg">Buy now</Link>}
                </li>
            ))}
        </ul>
    );
};
