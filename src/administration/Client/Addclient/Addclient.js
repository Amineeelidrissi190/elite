import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import plus from "../../../fitness/plus.png";
import Swal from "sweetalert2";
export default function Addclient() {
  const [errors, setErrors] = useState(null);

  const [ClientData, setClientData] = useState({
    name_client: "",
    age_client: "",
    numero_tel: "",
    email: "",
    password: "",
    specialite: [],
  });
  const specialities = ["crossfit", "Fitness", "Takewondo", "Judo"];

  const postdata = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://127.0.0.1:8000/api/register", ClientData);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/");
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
          showConfirmButton: true,
        });

      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full md:mx-4 mx-0">
      <form onSubmit={postdata} className="flex flex-col items-center justify-center w-full py-2 space-y-2 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-sm">Clients</h1>
            <input type="submit" value="Add" className="text-green-600 hover:underline cursor-pointer py-2" />
            
    
        </div>

        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Full Name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  name="name_client"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setClientData({ ...ClientData, name_client: e.target.value })}
                />
                {errors && errors.name_client && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.name_client[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Age:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Age"
                  name="age_client"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setClientData({ ...ClientData, age_client: e.target.value })}
                />
                {errors && errors.age_client && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.age_client[0]}</p>
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
                  name="numero_tel"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setClientData({ ...ClientData, numero_tel: e.target.value })}
                />
                {errors && errors.numero_tel && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.numero_tel[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Email:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setClientData({ ...ClientData, email: e.target.value })}
                />
                {errors && errors.email && (
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setClientData({ ...ClientData, password: e.target.value })}
                />
                {errors && errors.password && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.password[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Speciality:</label>
              <div className="md:w-10/12 w-full flex flex-col rounded-lg items-center justify-center p-2">
                <div className="flex md:space-x-8 space-x-1 items-center justify-center px-2">
                  {specialities.map((speciality) => (
                    <div className="flex flex-col items-center justify-center p-2" key={speciality}>
                      <input
                        type="checkbox"
                        name="specialite"
                        value={speciality}
                        className="form-checkbox h-5 w-5 text-red-500 bg-slate-950 border-gray-300"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setClientData((prevState) => ({
                              ...prevState,
                              specialite: [...prevState.specialite, speciality],
                            }));
                          } else {
                            setClientData((prevState) => ({
                              ...prevState,
                              specialite: prevState.specialite.filter((item) => item !== speciality),
                            }));
                          }
                        }}
                      />
                      <span className="text-white md:text-sm text-xs">{speciality}</span>
                    </div>
                  ))}
                </div>
                {errors && errors.specialite && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.specialite[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
