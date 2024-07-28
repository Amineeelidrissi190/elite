import logo from "./logo.png"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Navbarmobile(props) {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const handleMobileButtonClick = () => {
        const mobileMenu = document.querySelector("#mobilemenu");
        mobileMenu.classList.toggle('hidden');
      };
      const handleLogout = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/logout');
            if (user && token) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                token = ""
                user=""
                props.logout(user)
                
                
            }
    
            
            navigate("/");
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };
    

    return <header className="flex items-center justify-between px-5 space-x-3 md:hidden bg-black w-full">
        <Link to="/"><img src={logo} className="w-28" alt="Logo" /></Link>
        <div>
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

            <div className="md:hidden">
                <div
                    id="mobilemenu"
                    className="absolute flex hidden z-50 p-2 flex-col items-center space-y-1 top-14 drop-shadow-lg border border-gray-300 bg-black rounded-xl list-none left-6 right-6"
                >
                    <li><Link to="/AfficherEvent" className="font-bold text-sm text-white hover:text-red-700">Events</Link></li>
                    <li><Link to="/AfficherProduct" className="font-bold text-sm text-white hover:text-red-700">Products</Link></li>
                    <li><Link to="/AfficherTrainiesAdmin" className="font-bold text-sm text-white hover:text-red-700">Workout sessions</Link></li>
                    <li><Link to="/AfficheOffresAdmin" className="font-bold text-sm text-white hover:text-red-700">Offers</Link></li>
                    <li><Link to="/AfficherCoach" className="font-bold text-sm text-white hover:text-red-700">Coaches</Link></li>
                    <li><Link to="/AfficherAdmin" className="font-bold text-sm text-white hover:text-red-700">Admin</Link></li>
                    <li><Link to="/AfficherClient" className="font-bold text-sm text-white hover:text-red-700">Client</Link></li>
                    <li><Link to="/specialitie" className="font-bold text-sm text-white hover:text-red-700">Categories</Link></li>
                    <li><Link to="/Afficherreservation" className="font-bold text-sm text-white hover:text-red-700">Reservations</Link></li>
                    <li><Link to="/Affichercommand" className="font-bold text-sm text-white hover:text-red-700">Commands</Link></li>
                    <li><Link to="/Afficherinscription_event" className="font-bold text-sm text-white hover:text-red-700">inscription events</Link></li>
                    <li><Link to="/Afficherinscriptionoffr" className="font-bold text-sm text-white hover:text-red-700">inscription offers</Link></li>
                    <form method="post" className="" onSubmit={handleLogout}>
                        <input type="submit" value="Logout" className="bg-red-700 text-white px-6 py-2 rounded-2xl" />
                    </form>
                </div>
            </div>
        </div>

    </header>

}