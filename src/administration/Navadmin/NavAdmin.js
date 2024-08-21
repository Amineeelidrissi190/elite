import React, { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import api from '../../utils/axiosConfig';
import event from '../../fitness/event.png';
import wheypr from '../../fitness/wheypr.png';
import discount from '../../fitness/discount.png';
import coachic from '../../fitness/coachic.png';
import stopwatch from '../../fitness/stopwatch.png';
import home from '../../fitness/home.png';
import category from '../../fitness/category.png';
import out from '../../fitness/out.png';
import client from '../../fitness/client.png';
import reservation from '../../fitness/reservation.png';
import adminco from '../../fitness/adminco.png';
import packageorder from '../../fitness/packageorder.png';
import adduser from '../../fitness/adduser.png';
import signupevent from "../../fitness/signupevent.png"
import galerieimg from "../../fitness/galerieimg.png"
import us from "../../fitness/us.png"
import Elite2rem from "../../fitness/Elite2rem.png"
function NavAdmin(props) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();


  

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      props.setData("");
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className=" overflow-hidden w-80 bg-slate-950  border-r border-slate-900 flex flex-col space-y-2 min-h-screen ">
      <div className="w-full py-1 flex justify-center items-center">
      <Link to="/" className='flex justify-center items-center'>
        <img src={Elite2rem} alt="Logo" className='w-36' />
      </Link>
      </div>
      <div className='w-full mx-3 flex flex-col items-center justify-center'>

      <ul className="flex w-full flex-col items-center justify-center ">
        <div className="space-y-1 text-center w-full">
        <li className='w-full'>
            <NavLink to="/" className="flex items-center w-full focus:bg-slate-900 rounded-lg p-1 space-x-3">
              <img src={home} alt="Events" />
              <p className="hover:text-red-700 text-sm rounded-full">Home</p>
            </NavLink>
          </li>

          <li><NavLink to="/AfficherGallerie" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={galerieimg} alt="galerieimg" />
              <p className="hover:text-red-700 text-sm">Gallery</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/profil" className="flex items-center focus:bg-slate-900 rounded-lg p-1 space-x-3">
              <img src={us} />
              <p className="hover:text-red-700 text-sm">Profile</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/specialitie" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={category} alt="Categories" />
              <p className="hover:text-red-700 text-sm">Categories</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/AfficherEvent" className="flex focus:bg-slate-900 rounded-lg p-1 items-center space-x-3">
              <img src={event} alt="Events" />
              <p className="hover:text-red-700 text-sm">Events (admin)</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/AfficherProduct" className="flex focus:bg-slate-900 rounded-lg p-1 items-center space-x-3">
              <img src={wheypr}  alt="Products" />
              <p className="hover:text-red-700 text-sm">Products (admin)</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/AfficherTrainiesAdmin" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={stopwatch} alt="Personal Training" />
              <p className="hover:text-red-700 text-sm">Pers.training</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/AfficheOffresAdmin" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={discount}  alt="Offers" />
              <p className="hover:text-red-700 text-sm">Offers </p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Afficherinscriptionoffr" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={adduser}  alt="Inscription Offre" />
              <p className="hover:text-red-700 text-sm">Inscription Offre</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/AfficherCoach" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={coachic}  alt="Coaches" />
              <p className="hover:text-red-700 text-sm">Coaches </p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/AfficherAdmin" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3 ">
              <img src={adminco}  alt="Admin" />
              <p className="hover:text-red-700 text-sm">Admin </p>
            </NavLink>
          </li>



          <li>
            <NavLink to="/AfficherClient" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3 ">
              <img src={client} alt="Client" />
              <p className="hover:text-red-700 text-sm">Client </p>
            </NavLink>
          </li>


          <li>
            <NavLink to="/Afficherreservation" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={reservation}  alt="Pt. Reservation" />
              <p className="hover:text-red-700 text-sm">Pt.reservation</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Affichercommand" className="focus:bg-slate-900 rounded-lg p-1 flex items-cneter space-x-3 ">
              <img src={packageorder} alt="Orders" />
              <p className="hover:text-red-700 text-sm">Orders </p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Afficherinscription_event" className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={signupevent}  alt="Orders" />
              <p className="hover:text-red-700 text-sm">inscription events </p>
            </NavLink>
          </li>

          <li>
          <form method="post" onSubmit={handleLogout} className="focus:bg-slate-900 rounded-lg p-1 flex items-center space-x-3">
              <img src={out} alt="Logout" />
              <input type="submit" value="Logout" className="cursor-pointer hover:text-red-700 text-sm" />
            </form>
          </li>
        </div>
      </ul>
    </div>
    </div>
  );
}

export default NavAdmin;
