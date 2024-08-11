import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCoach() {
  const navigate = useNavigate();
  const [nomCoach, setNomCoach] = useState('');
  const [prenomCoach, setPrenomCoach] = useState('');
  const [phoneCoach, setPhoneCoach] = useState('');
  const [imageCoach, setImageCoach] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const role = 'coach';
  const [errors, setErrors] = useState({});
  const EnregistrerCoach = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const formData = new FormData();
      formData.append('nom_coach', nomCoach);
      formData.append('prenom_coach', prenomCoach);
      formData.append('phone_coach', phoneCoach);
      formData.append('image_coach', imageCoach);
      formData.append('description', description);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      const res = await axios.post("http://127.0.0.1:8000/api/register", formData);
      
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full md:mx-4 mx-0">
      <form onSubmit={EnregistrerCoach} className="flex flex-col items-center justify-center w-full p-2 space-y-3 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-lg">Coaches</h1>
          <input type="submit" value="Add" className="text-green-600 py-2 hover:underline cursor-pointer" />
        </div>
        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Family name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="nom_coach"
                  value={nomCoach}
                  onChange={(e) => setNomCoach(e.target.value)}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Family name"
                />
                {errors.nom_coach && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.nom_coach[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">First name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="prenom_coach"
                  value={prenomCoach}
                  onChange={(e) => setPrenomCoach(e.target.value)}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="First name"
                />
                {errors.prenom_coach && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.prenom_coach[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Phone:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="phone_coach"
                  value={phoneCoach}
                  onChange={(e) => setPhoneCoach(e.target.value)}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Phone number"
                />
                {errors.phone_coach && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.phone_coach[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  maxLength="468"
                  placeholder="Description"
                />
                {errors.description && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.description[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Email:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)  }
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.email[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Password:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {setpassword(e.target.value) }}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.password[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Image:</label>
              <div className="md:w-10/12 w-full space-y-1">
                <div className="flex flex-col border rounded-lg items-center justify-center">
                  <div className="flex justify-center w-full md:h-64 h-40">
                    {imageCoach && (
                      <img src={URL.createObjectURL(imageCoach)} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                  </div>
                  <div className="md:p-1 p-0 w-full">
                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                      <p className="text-xs md:text-base">Select an image:</p>
                      <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-base md:py-3 px-3 py-2 rounded-lg">Browse</label>
                    </div>
                    <input type="file" id="imageInput" className="hidden" name="image_coach" onChange={(e) => setImageCoach(e.target.files[0])} />
                  </div>
                </div>
                {errors.image_coach && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.image_coach[0]}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
