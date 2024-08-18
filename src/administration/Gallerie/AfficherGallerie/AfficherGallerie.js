import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function AfficherGallerie() {
    const [datacoach, setDatacoach] = useState({ gallerie: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/gallerie");
            setLoading(false);
            setDatacoach({ gallerie: res.data.gallerie || [] });
        } catch (errors) {
            console.error(errors);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Attention',
            text: "Are you sure you want to delete this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/gallerie/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The item has been deleted.',
                            'success'
                        );
                        fetchClients();
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the item.',
                            'error'
                        );
                    });
            }
        });
    };

    if (loading) {
        return <div className="flex items-center justify-center w-full ">
            <div data-glitch="Loading..." className="glitch text-white text-3xl">Loading...</div>
        </div>;
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col py-2 space-y-2">
            <div className='w-full flex justify-between items-center bg-slate-950 py-4 px-6 rounded-lg'>
                <p className='text-white text-sm'>AfficherGallerie</p>
                <Link to="/AddGalerie" className='text-green-600 text-base font-medium hover:underline'>AddGalerie</Link>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={20}
                className="w-full "
            >
                {Array.from({ length: Math.ceil(datacoach.gallerie.length / 6) }).map((_, slideIndex) => (
                    <SwiperSlide key={slideIndex} className="flex w-full flex-col space-y-3">
                        <div className="grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                            {datacoach.gallerie.slice(slideIndex * 6, slideIndex * 6 + 6).map((item) => (
                                <div key={item.id} className="flex flex-col items-center bg-gray-800 p-2 rounded-lg">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/photos/gallery/${item.picture}`}
                                        alt={`Gallery item ${item.id}`}
                                        className="h-48 w-full object-fit rounded-md"
                                    />
                                    <div className="w-full flex justify-between items-center mt-3">
                                        <p className="text-white text-sm">Image {item.id}</p>
                                        <div className="flex space-x-4">
                                            <Link to={`/EditGalerie/${item.id}`} className="text-blue-500 text-xs hover:underline">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 text-xs hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
