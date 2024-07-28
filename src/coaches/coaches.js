import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gg from '../fitness/gg.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import "./coaches.css"
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './coaches.css';

function Coaches() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [dataCoach, setdataCoach] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/coach');
        setdataCoach(res.data);
      } catch (errors) {
        console.log(errors);
      }
    };
    
    fetchData();

    const handleResize = () => {
      if (window.innerWidth <= 741) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // Pour initialiser le nombre de coaches par slide lors du chargement de la page

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id='co' className="flex flex-col items-center space-y-1">
      <div className="flex items-end space-x-2 justify-center">
        <h1>
        <div className="loader">
            <div id='coachtitre' data-glitch="Our Team" className="glitch">Our Team</div>
          </div>
        </h1>
        <img src={gg} alt="Your Image Alt Text" className="flex items-center justify-end w-12" id='ggmen' />
      </div>
      <p className="text-center font-bold w-4/5 text-sm md:text-lg">
        Meet our dedicated team of certified coaches who are not just trainers, but partners in your fitness odyssey.
        With their personalized guidance and constant support, surpass your limits and unlock your full potential at
        every workout session.
      </p>
      <div className="flex justify-center md:w-11/12 w-full md:space-x-3 space-x-3 space-y-2 items-center h-3/4">
        <Swiper
        
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true, renderBullet: function (index, className) {
            return `<span class="${className} bg-red-700"></span>`;
          }}}
          scrollbar={{ draggable: true }}
          slidesPerView={slidesPerView}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className='w-full'
        >
          {dataCoach.map((e, index) => (
            <SwiperSlide key={index}>
              <div className="flex py-7 w-full justify-center">
                <div className="flex items-center bg-red-700 mx-10 md:w-80 w-11/12 p-2 rounded-lg flex-col justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={`http://127.0.0.1:8000/storage/photos/coach/${e.image_coach}`}
                      alt={`Coach ${e.nom_coach} ${e.prenom_coach}`}
                      className="w-20 h-20 bg-slate-400 rounded-full"
                    />
                    <div className="flex space-x-1 items-center justify-center">
                      <p className="font-bold">{e.nom_coach}</p>
                      <p className="font-bold">{e.prenom_coach}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-2">
                    <p className="font-semibold text-center text-lg">Phone: {e.phone_coach}</p>
                    <h1 className="text-lg font-bold text-center mt-2">About Us</h1>
                    <p className="text-sm font-semibold">
                      {showFullDescription ? e.description : `${e.description.substring(0, 100)}...`}
                    </p>
                    {e.description.length > 100 && (
                      <button onClick={toggleDescription} className="bg-black w-full px-5 py-2 rounded-lg">
                        {showFullDescription ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Coaches;
