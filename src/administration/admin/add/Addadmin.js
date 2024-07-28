import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plus from "../../../fitness/plus.png";

export default function Addadmin() {
  const navigate = useNavigate();
  const [nomAdmin, setNomAdmin] = useState("");
  const [prenomAdmin, setPrenomAdmin] = useState("");
  const [phoneAdmin, setPhoneAdmin] = useState("");
  const [imageAdmin, setImageAdmin] = useState(null);
  const [errors, setErrors] = useState({});
  const [compteAdmin, setCompteAdmin] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const EnregistrerAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const formData = new FormData();
      formData.append('email', compteAdmin.email);
      formData.append('password', compteAdmin.password);
      formData.append('role', compteAdmin.role);
      formData.append('nom_admin', nomAdmin);
      formData.append('prenom_admin', prenomAdmin);
      formData.append('phone_admin', phoneAdmin);
      formData.append('image_admin', imageAdmin);
      const res = await axios.post("http://127.0.0.1:8000/api/register", formData);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/AfficherAdmin");
      }
      
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full md:mx-4 mx-0">
      <form onSubmit={EnregistrerAdmin} className="flex flex-col items-center justify-center w-full p-2 space-y-3 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-lg">Admins</h1>
          <input type="submit" value="Add" className="text-green-600 hover:underline cursor-pointer py-2" />
        </div>

        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Family Name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Family name"
                  name="nom_admin"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setNomAdmin(e.target.value)}
                />
                {errors.nom_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.nom_admin[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">First Name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="First name"
                  name="prenom_admin"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setPrenomAdmin(e.target.value)}
                />
                {errors.prenom_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.prenom_admin[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Phone:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Phone number"
                  name="phone_admin"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setPhoneAdmin(e.target.value)}
                />
                {errors.phone_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.phone_admin[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Email:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setCompteAdmin({ ...compteAdmin, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.email[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Password:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setCompteAdmin({ ...compteAdmin, password: e.target.value })}
                />
                {errors.password && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.password[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Image:</label>
              <div className="md:w-10/12 w-full">
                <div className="flex flex-col border rounded-lg items-center justify-center">
                  <div className="flex justify-center w-full md:h-64 h-40">
                    {imageAdmin && (
                      <img src={URL.createObjectURL(imageAdmin)} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                  </div>
                  <div className="md:p-1 p-0 w-full">
                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                      <p className="text-xs md:text-sm">Select an image:</p>
                      <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                    </div>
                    <input type="file" id="imageInput" className="hidden" name="image_admin" onChange={(e) => setImageAdmin(e.target.files[0])} />
                  </div>
                </div>
                {errors.image_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.image_admin[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
