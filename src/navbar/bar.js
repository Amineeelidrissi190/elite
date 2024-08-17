import { Link, useNavigate, NavLink } from "react-router-dom";
// import { useEffect, useState } from "react";
import React from 'react';
import logo from "./logo.png";
import axios from "axios";
import "./bar.css";
import ScrollAnimation from "../ScrollAnimation";

function Bar({ sticky, logout }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Set authorization header if token exists
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const handleMobileButtonClick = () => {
    const mobileMenu = document.querySelector("#mobilemenu");
    mobileMenu.classList.toggle('hidden');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      logout("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollAnimation>
      <div className={`center-content ${sticky ? "bg-black" : ""} flex justify-around items-center z-50`}>
        <Link to="/">
          <img src={logo} alt="logo" className="md:w-full w-28" />
        </Link>
        <div className="hidden md:flex items-center">
          <ul className="flex justify-between items-center space-x-6">
            <li><NavLink to="/gallery" className="text-white font-bold text-base hover:text-red-700">Gallery</NavLink></li>
            <li><NavLink to="/events" className="text-white font-bold text-base hover:text-red-700">Events</NavLink></li>
            <li><NavLink to="/product" className="text-white font-bold text-base hover:text-red-700">Products</NavLink></li>
            <li><NavLink to="/trainies" className="text-white font-bold text-base hover:text-red-700">Workout-sessions</NavLink></li>
            <li><NavLink to="/offres" className="text-white font-bold text-base hover:text-red-700">Offres</NavLink></li>
            <li><NavLink to="/specialite" className="text-white font-bold text-base hover:text-red-700">Specialities</NavLink></li>
          </ul>
        </div>
        {token && user && user.role === "client" ? (
          <form method="post">
            <input type="submit" onClick={handleLogout} className="hidden md:flex bg-red-700 text-white px-6 py-2 rounded-2xl hover:text-black hover:bg-white list-none" value="Logout" />
          </form>
        ) : (
          <Link to="/Login">
            <li className="hidden md:flex bg-red-700 text-white px-6 py-2 rounded-2xl hover:text-black hover:bg-white list-none">Login</li>
          </Link>
        )}

        <div className="md:hidden w-1/2 flex items-center justify-end">
          <svg
            id="mobilebtn"
            className="md:hidden w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            onClick={handleMobileButtonClick}
          >
            <path stroke="currentColor" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </div>
        <div className="md:hidden">
          <div
            id="mobilemenu"
            className="absolute flex hidden p-4 flex-col items-center space-y-4 top-14 drop-shadow-lg border border-gray-300 bg-black rounded-xl list-none left-4 right-4"
          >
            <li><NavLink to="/events" className="font-bold text-base text-white hover:text-red-700">Events</NavLink></li>
            <li><NavLink to="/product" className="font-bold text-base text-white hover:text-red-700">Products</NavLink></li>
            <li><NavLink to="/trainies" className="font-bold text-base text-white hover:text-red-700">Workout-sessions</NavLink></li>
            <li><NavLink to="/offres" className="font-bold text-base text-white hover:text-red-700">Offres</NavLink></li>
            <li><NavLink to="/specialite" className="font-bold text-base text-white hover:text-red-700">Specialities</NavLink></li>
            {token && user && user.role === "client" ? (
              <form method="post">
                <input type="submit" onClick={handleLogout} className="flex bg-red-700 text-white px-6 py-2 rounded-2xl hover:text-black hover:bg-white list-none" value="Logout" />
              </form>
            ) : (
              <Link to="/Login">
                <li className="md:flex bg-red-700 text-white px-6 py-2 rounded-2xl hover:text-black hover:bg-white list-none">Login</li>
              </Link>
            )}
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default Bar;
