import React, { useState, useEffect } from 'react';
import Push2 from "../fitness/Push2.png";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ScrollAnimation from '../ScrollAnimation';
import Swal from 'sweetalert2';

export default function Gallery() {
    const [datacoach, setDatacoach] = useState({ gallerie: [] });
    const [loading, setLoading] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(1);
    const [slidesLayout, setSlidesLayout] = useState('single');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/gallerie");
                setDatacoach({ gallerie: res.data.gallerie || [] });
            } catch (errors) {
                console.error(errors);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSlidesPerView(1);
                setSlidesLayout('single');
            } else {
                setSlidesPerView(1);
                setSlidesLayout('grid');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const groupedGallery = datacoach.gallerie.reduce((result, item, index) => {
        const groupIndex = Math.floor(index / 6);
        if (!result[groupIndex]) {
            result[groupIndex] = [];
        }
        result[groupIndex].push(item);
        return result;
    }, []);

    const handleImageClick = (imageUrl) => {
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: 'Gallery Image',
            showCloseButton: true,
            showConfirmButton: false,
            imageWidth: '100%',
            imageHeight: 'auto',
            background: '#0000',
            customClass: {
                popup: 'sweetalert-custom', // Appliquer la classe personnalisée
            },
        });
    };
    
    return (
        <ScrollAnimation>
            <div className='relative mx-auto flex items-center justify-center h-screen w-full'>
                <img src={Push2} className='absolute inset-0 w-full h-full object-fit' alt="Background" />
                <div className="relative flex items-center justify-center md:w-11/12 w-11/12  h-3/4 bg-black bg-opacity-75 border border-red-700 rounded-lg">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div data-glitch="Loading..." className="glitch text-white text-3xl">Loading...</div>
                        </div>
                    ) : datacoach.gallerie.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div data-glitch="No pictures available" className="glitch text-white text-3xl">No pictures available</div>
                        </div>
                    ) : (
                        <div className='w-full flex items-center justify-center'>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                slidesPerView={slidesPerView}
                                spaceBetween={10}
                                className="w-full h-full"
                            >
                                {slidesLayout === 'grid' ? (
                                    groupedGallery.map((group, groupIndex) => (
                                        <SwiperSlide key={groupIndex}>
                                            <div className="grid grid-cols-3 gap-4 p-2">
                                                {group.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-center border border-red-700 bg-black bg-opacity-60 p-2 rounded-lg"
                                                        onClick={() => handleImageClick(`http://127.0.0.1:8000/storage/photos/gallery/${item.picture}`)}
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000/storage/photos/gallery/${item.picture}`}
                                                            alt={`Gallery item ${item.id}`}
                                                            className="h-48 w-full object-fit cursor-pointer rounded-md"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    datacoach.gallerie.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="flex items-center justify-center bg-black bg-opacity-60  p-2 rounded-lg"
                                                onClick={() => handleImageClick(`http://127.0.0.1:8000/storage/photos/gallery/${item.picture}`)}
                                            >
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/photos/gallery/${item.picture}`}
                                                    alt={`Gallery item ${item.id}`}
                                                    className="h-48 w-full object-cover rounded-md"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                )}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </ScrollAnimation>
    );
}
