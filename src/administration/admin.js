import React, { useState, useEffect } from "react";
import NavAdmin from "./Navadmin/NavAdmin";
import { Link } from "react-router-dom";
import "./admin.css";
import cop from "../fitness/cop.png";
import facebooklast from "../fitness/facebooklast.png"
import instapng from "../fitness/instapng.png"
import whatsappng from "../fitness/whatsapppng.png"
import yt from "../fitness/yt.png"// Ajoutez le chemin correct

export default function Admin() {
  const [text, setText] = useState(""); 
  const [index, setIndex] = useState(0); 
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [showIcons, setShowIcons] = useState(false); 
  return<div className="w-full flex py-2 px-2 space-x-2 justify-center">
    <Link to="/EventAdminHome" className="bg-slate-950 w-1/5 rounded-lg h-28 flex items-center justify-center hover:scale-105">Event</Link>
    <Link to="/ProductHomeAdmin" className="bg-slate-950  w-1/5 rounded-lg h-28 flex items-center justify-center hover:scale-105">Products</Link>
    <Link to="/OffresHomeAdmin" className="bg-slate-950 w-1/5 rounded-lg h-28 flex items-center justify-center hover:scale-105">Offers</Link>
    <Link to="/PtrainiesHomeAdmin" className="bg-slate-950 w-1/5 rounded-lg h-28 flex items-center justify-center hover:scale-105">Personal training</Link>
    <Link to="/Connecteduser" className="bg-slate-950 w-1/5 rounded-lg h-28 flex items-center justify-center hover:scale-105">users</Link>
    </div>


}
