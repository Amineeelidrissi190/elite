import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../nav/nav";
import About from "../about/about";
import Contact from "../contact us/Contact us";
import Bar from "../navbar/bar";
import Admin from "../administration/admin";
import NavAdmin from "../administration/Navadmin/NavAdmin";
import CreateOffres from "../administration/offresadmin/create/createOffres";
import CreateCoach from "../administration/CoachAdmin/create/CreateCoach";
import DeleteCoach from "../administration/CoachAdmin/delete/DeleteCoach";
import CreateTrainies from "../administration/trainiesadmin/create/CreateTrainies";
import EditOffres from "../administration/offresadmin/edit/EditOffres";
import EditSpecialite from "../administration/specialiteAdmin/modifier/editSpecialite";
import DeleteOffres from "../administration/offresadmin/delete/DeleteOffres";
import UpdateTrainies from "../administration/trainiesadmin/update/UpdateTrainies";
import AfficherCoach from "../administration/CoachAdmin/afficher/afficherCoach";
import AfficherTrainiesAdmin from "../administration/trainiesadmin/afficher/AfficherTrainiesAdmin";
import CreateSpecialite from "../administration/specialiteAdmin/create/createSpecialite";
import AddProduct from "../administration/productadmin/create/AddProduct";
import AfficherOffre from "../administration/offresadmin/afficher/AfficherOffres";
import AffichageSpecialites from "../administration/specialiteAdmin/afficher/AffichageSpecialities";
import AfficherProduct from "../administration/productadmin/afficher/AfficherProduct";
import UpdateProduct from "../administration/productadmin/update/UpdateProduct";
import UpdateCoach from "../administration/CoachAdmin/update/UpdateCoach";
import Addadmin from "../administration/admin/add/Addadmin";
import DeleteAdmin from "../administration/admin/delete/DeleteAdmin";
import Afficheradmin from "../administration/admin/afficher/Afficheradmin";
import EditAdmin from "../administration/admin/edit/EditAdmin";
import AddEvent from "../administration/EventsAdmin/create/AddEvent";
import EditEvent from "../administration/EventsAdmin/edit/EditEvent";
import AfficherEvent from "../administration/EventsAdmin/afficher/AfficherEvent";
import Addclient from "../administration/Client/Addclient/Addclient";
import DeleteClient from "../administration/Client/DeleteClient/DeleteClient";
import AfficherClient from "../administration/Client/AfficherClient/AfficherClient";
import Afficherreservation from "../administration/reservation/Afficherreservation";
import Deletereservation from "../administration/reservation/Deletereservation";
import Affichercommand from "../administration/command/Afficher/Affichercommand";
import Deletecommand from "../administration/command/delete/Deletecommand";
import Afficherinscriptionoffr from "../administration/inscription offre/Afficher/Afficherinscriptionoffr";
import Deleteinscriptionoffr from "../administration/inscription offre/delete/Deleteinscriptionoffr";
import "../input.css";
import Afficherinscription_event from "../administration/inscription_event/Afficherinscription_event";
import EventAdminHome from "../administration/EventAdminHome/EventAdminHome";
import Specialite from "../specialite/specialite";
import Navbarmobile from "../administration/Navadmin/Navbarmobile";
import Crossfit from "../crossfit/crossfit";
import Trainies from "../personal training/trainies";
import JUDO from "../judo/judo";
import axios from "../utils/axiosConfig"; // Importer l'instance configurée
import Takewando from "../takewando/takewando";
import Product from "../products/product";
import Coaches from "../coaches/coaches";
import Fitness from "../fitness/fitness";
import Events from "../events/events";
import Login from "../login/Login";
import Offres from "../offres/offres";
import Join from "../inscription/join";
import Detailproduct from "../products/Detailproduct";
import DetailTrainies from "../personal training/DetailTrainies";
import DetailEvent from "../events/DetailEvent";
import DetailOffres from "../offres/DetailOffres";
import Pageerror from "../pageEror/pageerror";
import Deleteinscription_event from "../administration/inscription_event/Deleteinscription_event";
import ScrollAnimation from "../ScrollAnimation";
import Deleteinsoffer from "../administration/inscription offre/Afficher/Deleteinsoffer";
import Profil from "../administration/profil/profil";
import ProductHomeAdmin from "../administration/productHomeAdmin/productHomeAdmin";
import OffresHomeAdmin from "../administration/offresHomeAdmin/OffresHomeAdmin";
import PtrainiesHomeAdmin from "../administration/ptrainiesHomeAdmin/PtrainiesHomeAdmin";
import ConnectedUsers from "../administration/connectedusers/Connectedusers";
import jwtDecode from 'jwt-decode';
import Gallery from "../Gallery/Gallery";
import Swal from 'sweetalert2';
import EditProfil from "../administration/profil/EditProfil";
import down from "../fitness/down.svg";
import "./App.css";
import AfficherGallerie from "../administration/Gallerie/AfficherGallerie/AfficherGallerie";
import AddGalerie from "../administration/Gallerie/add/AddGalerie";
import EditGalerie from "../administration/Gallerie/Edit/EditGalerie";
import Elite2rem from "../fitness/Elite2rem.png"
function App() {
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState(null); // null instead of empty string
  const [eliteClass, setEliteClass] = useState('');
  const [isEliteHidden, setIsEliteHidden] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsEliteHidden(true);
        setIsContentVisible(true);
        setSticky(true)
      } else {
        setIsEliteHidden(false);
        setIsContentVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.post("/auth/me");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch {
      console.log("L'utilisateur n'est pas connecté");
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post("/auth/logout");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error("Erreur de déconnexion : ", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const handleSessionExpired = () => {
      handleLogout();
    };

    window.addEventListener('sessionExpired', handleSessionExpired);

    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        {user && user.role === "admin" ? (
          <nav className="text-white bg-slate-900 min-h-screen md:flex w-screen" id="nav">
            <div className="hidden md:flex w-52">
              <NavAdmin setData={setUser} logout={handleLogout} />
            </div>
            <Navbarmobile setData={setUser} logout={handleLogout} />
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/CreateOffresAdmin" element={<CreateOffres />} />
              <Route path="/AfficheOffresAdmin" element={<AfficherOffre />} />
              <Route path="/editOffresAdmin/:id_offre" element={<EditOffres />} />
              <Route path="/OffresHomeAdmin" element={<OffresHomeAdmin />} />
              <Route path="/deleteOffresAdmin/:id_offre" element={<DeleteOffres />} />
              <Route path="/PtrainiesHomeAdmin" element={<PtrainiesHomeAdmin />} />
              <Route path="/CreateTrainies" element={<CreateTrainies />} />
              <Route path="/UpdateTrainies/:id_trainies" element={<UpdateTrainies />} />
              <Route path="/AfficherTrainiesAdmin" element={<AfficherTrainiesAdmin />} />
              <Route path="/Addclient" element={<Addclient/>} />
              <Route path="/EventAdminHome" element={<EventAdminHome />} />
              <Route path="/Deleteinsoffer/:id" element={<Deleteinsoffer />} />
              <Route path="/Deleteinscription_event/:id_eventpivot" element={<Deleteinscription_event />} />
              <Route path="/Deleteinscriptionoffr/:id_inscription_offre" element={<Deleteinscriptionoffr />} />
              <Route path="/CreateSpecialite" element={<CreateSpecialite />} />
              <Route path="/AffichageSpecialites" element={<AffichageSpecialites />} />
              <Route path="/Create" element={<CreateSpecialite />} />
              <Route path="/edit/:id_specialite" element={<EditSpecialite />} />
              <Route path="/AfficherProduct" element={<AfficherProduct />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/UpdateProduct/:id_product" element={<UpdateProduct />} />
              <Route path="/AfficherAdmin" element={<Afficheradmin />} />
              <Route path="/AddAdmin" element={<Addadmin />} />
              <Route path="/DeleteAdmin/:id_Admin" element={<DeleteAdmin />} />
              <Route path="/EditAdmin/:id_Admin" element={<EditAdmin />} />
              <Route path="/CreateCoach" element={<CreateCoach />} />
              <Route path="/AfficherCoach" element={<AfficherCoach />} />
              <Route path="/UpdateCoach/:id_coach" element={<UpdateCoach />} />
              <Route path="/DeleteCoach/:id_coach" element={<DeleteCoach />} />
              <Route path="/Afficherinscription_event" element={<Afficherinscription_event />} />
              <Route path="/AfficherEvent" element={<AfficherEvent />} />
              <Route path="/AddEvent" element={<AddEvent />} />
              <Route path="/EditEvent/:id_Event" element={<EditEvent />} />
              <Route path="/Connecteduser" element={<ConnectedUsers />} />
              <Route path="/EditProfil" element={<EditProfil />} />
              <Route path="/*" element={<Pageerror />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/specialitie" element={<AffichageSpecialites />} />
              <Route path="/Afficherinscriptionoffr" element={<Afficherinscriptionoffr />} />
              <Route path="/AfficherClient" element={<AfficherClient />} />
              <Route path="/Afficherreservation" element={<Afficherreservation />} />
              <Route path="/Affichercommand" element={<Affichercommand />} />
              <Route path="/ProductHomeAdmin" element={<ProductHomeAdmin />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/AfficherGallerie" element={<AfficherGallerie />} />
              <Route path="/AddGalerie" element={<AddGalerie />} />
              <Route path="/EditGalerie/:id" element={<EditGalerie />} />


            </Routes>
          </nav>
        ) : (
          <div>
            <div id="elite" className={isEliteHidden ? 'hidden' : ''}>
              <div className="loader">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col h-96 items-center justify-center">
                    {/* <div id='eliteglitch' data-glitch="ELITE" className="glitch">ELITE</div> */}
                    <img src={Elite2rem} alt="logo" className="w-56 custome-shadow p-1 glitch" id='eliteglitch' data-glitch="ELITE"/>
                    <div id='' data-glitch="The deep black breath" className="glitch">The deep black breath</div>
                  </div>
                  <div className="flex items-center space-y-7 justify-center flex-col">
                    <div id='' data-glitch="scroll down" className="glitch">scroll down</div>
                    <div id='' data-glitch="" className="glitch">
                      <img src={down} onClick={() => {
                        window.scrollTo({
                          top: 2,
                          behavior: "smooth",
                        })
                      }} className="w-16 h-16 cursor-pointer filter invert-[50%] sepia-[100%] saturate-[500%] hover-red-filter hue-rotate-[180deg] brightness-[100%] contrast-[100%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`content ${isContentVisible ? 'visible' : ''}`}>
              <nav className="bg-black text-white min-h-screen overflow-hidden" id="nav">
                <header className="mx-auto w-full fixed z-50"><Bar sticky={sticky} logout={handleLogout} /></header>
                <Routes>
                  <Route path="/trainies" element={<Trainies />} />
                  <Route path="/Detailtrainies/:id_trainies" element={<DetailTrainies />} />
                  <Route path="/" element={<Nav />} />
                  <Route path="/AddAdmin" element={<Addadmin />} />
                  <Route path="/judo" element={<JUDO />} />
                  <Route path="/offres" element={<Offres />} />
                  <Route path="/DetailOffres/:id_offre" element={<DetailOffres />} />
                  <Route path="/takewando" element={<Takewando />} />
                  <Route path="/crossfit" element={<Crossfit />} />
                  <Route path="/fitness" element={<Fitness />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/DetailEvent/:id_event" element={<DetailEvent />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/Detailproduct/:id_product" element={<Detailproduct />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/Login" element={<Login setData={setUser} />} />
                  <Route path="/specialite" element={<Specialite />} />
                  <Route path="/*" element={<Pageerror />} />
                </Routes>
              </nav>
              <article className="text-white overflow-hidden bg-black w-full min-h-fit">
                <div className="h-32 w-full flex items-center justify-center">
                  <div className="loader">
                    <img src={down} onClick={() => {
                      window.scrollTo({
                        top: 680,
                        behavior: "smooth",
                      })
                    }} className=" glitch w-16 h-16 cursor-pointer filter invert-[50%] sepia-[100%] saturate-[500%] hover-red-filter hue-rotate-[180deg] brightness-[100%] contrast-[100%]" />
                  </div>
                </div>
                <ScrollAnimation>
                  <Coaches />
                </ScrollAnimation>
              </article>
              <section className="bg-black text-white">
                <div className="h-32 w-full flex items-center justify-center">
                  <div className="loader">
                    <img src={down} onClick={() => {
                      window.scrollTo({
                        top: 1250,
                        behavior: "smooth",
                      })
                    }} className=" glitch w-16 h-16 cursor-pointer filter invert-[50%] sepia-[100%] saturate-[500%] hover-red-filter hue-rotate-[180deg] brightness-[100%] contrast-[100%]" />
                  </div>
                </div>
                <ScrollAnimation>
                  <About />
                </ScrollAnimation>
              </section>
              <footer className="bg-black w-full overflow-hidden">
                <div className="h-12"></div>
                <ScrollAnimation>
                  <Contact />
                </ScrollAnimation>
              </footer>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
