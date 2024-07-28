import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import designl from "../fitness/designl.png";
import power3c from "../fitness/power3c.png";
import ScrollAnimation from "../ScrollAnimation";

function Join() {
    const [errors, setErrors] = useState(null);
    const [token, setToken] = useState("");
    const [ClientData, setClientData] = useState({
        name_client: '',
        age_client: '',
        numero_tel: '',
        email: '',
        password: '',
        specialite: [],
        users_id: ''  // Ajout de users_id
    });

    const navigate = useNavigate();
    const specialities = ["crossfit", "Fitness", "Takewondo", "Judo"];
    const users_table = {
        email: ClientData.email,
        password: ClientData.password,
    };

    const postdata = async (e) => {
        e.preventDefault();
        try {
            const client_table = {
                email: ClientData.email,
                password: ClientData.password,
                name_client: ClientData.name_client,
                age_client: ClientData.age_client,
                numero_tel: ClientData.numero_tel,
                specialite: ClientData.specialite,
            };
            const res = await axios.post('http://127.0.0.1:8000/api/register', client_table);
            if (res.data.errors) {
                setErrors(res.data.errors);
              } else {
                navigate("/Login");
              }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <ScrollAnimation>
            <div className="relative top-0 left-0">
                <img src={designl} className="bg-cover min-h-screen" />
                <div className="absolute md:top-0 top-7 left-0 w-full h-full flex flex-col items-center justify-center">
                    <form className="w-11/12 flex flex-col space-y-2 bg-black bg-opacity-70 p-2 md:w-1/2 border border-red-700 rounded-lg" method="post" onSubmit={postdata}>
                        <div className="flex items-center justify-center space-x-1">
                            <h2 className="md:text-lg text-sm flex justify-center items-end font-bold">Feel the powe<span className="text-red-700">r</span></h2>
                            <img src={power3c} className="md:w-20 w-8" />
                        </div>
                        <div className="flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-1 space-x-0">
                            <div className="md:w-1/2 w-full">
                                <input type="text" placeholder="Name" className="p-1 focus:border-red-700 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" name="name_client" onChange={(e) => {
                                    setClientData({ ...ClientData, name_client: e.target.value });
                                }} />
                                {errors && errors.name_client && <p className="text-red-700 w-full md:text-base text-xs self-start">{errors.name_client[0]}</p>}
                            </div>
                            <div className="md:w-1/2 w-full">
                                <input type="text" placeholder="Age" className="p-1 focus:border-red-700 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" name="age_client" onChange={(e) => {
                                    setClientData({ ...ClientData, age_client: e.target.value });
                                }} />
                                {errors && errors.age_client && <p className="text-red-700 w-full md:text-base text-xs self-start">{errors.age_client[0]}</p>}
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-1 space-x-0">
                            <div className="md:w-1/2 w-full">
                                <input type="text" placeholder="Phone number" className="p-1 focus:border-red-700 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" name="numero_tel" onChange={(e) => {
                                    setClientData({ ...ClientData, numero_tel: e.target.value });
                                }} />
                                {errors && errors.numero_tel && <p className="text-red-700 w-full md:text-base text-xs self-start">{errors.numero_tel[0]}</p>}
                            </div>
                            <div className="md:w-1/2 w-full">
                                <input type="email" placeholder="email" className="p-1 focus:border-red-700 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" name="email" onChange={(e) => {
                                    setClientData({ ...ClientData, email: e.target.value });
                                }} />
                                {errors && errors.email && <p className="text-red-700 w-full md:text-base text-xs self-start">{errors.email[0]}</p>}
                            </div>
                        </div>
                        <div className="w-full">
                            <input type="password" placeholder="Password" className="p-1 focus:border-red-700 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" name="password" onChange={(e) => {
                                setClientData({ ...ClientData, password: e.target.value });
                            }} />
                            {errors && errors.password && <p className="text-red-700 w-full md:text-base text-xs self-start">{errors.password[0]}</p>}
                        </div>
                        <div className="flex items-center justify-center px-2">
                            {specialities.map(speciality => (
                                <div className="flex flex-col items-center justify-center md:p-2 p-1" key={speciality}>
                                    <input type="checkbox" name="specialite" value={speciality} className="form-checkbox h-5 w-5 text-red-500 bg-red-700 border-gray-300"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setClientData(prevState => ({
                                                    ...prevState, specialite: [...prevState.specialite, speciality]
                                                }));
                                            } else {
                                                setClientData(prevState => ({
                                                    ...prevState, specialite: prevState.specialite.filter(item => item !== speciality)
                                                }));
                                            }
                                        }}
                                    />
                                    <p className="md:text-base text-xs">{speciality}</p>
                                </div>
                            ))}
                        </div>
                        {errors && errors.specialite && <p className="text-red-700 w-full md:text-base text-xs text-center">{errors.specialite[0]}</p>}
                        <input type="submit" value="Subscribe" className="hover:bg-red-700 p-1 md:text-base text-xs outline-none w-full h-10 bg-transparent border rounded-lg" />
                        <h2 className="flex items-center md:text-base text-sm justify-center font-semibold">You have an account? <Link to="/Login" className="font-bold hover:text-red-700">Login</Link></h2>
                    </form>
                </div>
            </div>
        </ScrollAnimation>
    );
}

export default Join;
