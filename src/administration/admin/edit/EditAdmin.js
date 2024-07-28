import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pen from "../../../fitness/pen.png";

export default function EditAdmin() {
  const { id_Admin } = useParams();
  const [nom_admin, setNom_admin] = useState("");
  const [prenom_admin, setPrenom_admin] = useState("");
  const [phone_admin, setPhone_admin] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [image_admin, setImage_admin] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [id_users, setId_users] = useState(null);

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      const res1 = await axios.get(`http://127.0.0.1:8000/api/admin/${id_Admin}`);
      setNom_admin(res1.data.nom_admin);
      setPrenom_admin(res1.data.prenom_admin);
      setPhone_admin(res1.data.phone_admin);
      setImage_admin(res1.data.image_admin);
      setId_users(res1.data.id_users);
      setImagePreview(`http://127.0.0.1:8000/storage/photos/admin/${res1.data.image_admin}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setImage_admin(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      switch (e.target.name) {
        case "nom_admin":
          setNom_admin(e.target.value);
          break;
        case "prenom_admin":
          setPrenom_admin(e.target.value);
          break;
        case "phone_admin":
          setPhone_admin(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom_admin", nom_admin);
    formData.append("prenom_admin", prenom_admin);
    formData.append("phone_admin", phone_admin);
    formData.append("id_users", id_users);

    if (image_admin !== null && typeof image_admin !== 'string') {
      formData.append("image_admin", image_admin);
    }

    try {
      const res2 = await axios.post(
        `http://127.0.0.1:8000/api/admin/${id_Admin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/AfficherAdmin");
      console.log(res2.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full md:mx-4 mx-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg"
      >
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-sm">Admins</h1>
          <input
            type="submit"
            value="Edit"
            className="py-2 text-yellow-400 hover:underline cursor-pointer"
          />
        </div>
        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Family name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  name="nom_admin"
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Family name"
                  value={nom_admin}
                />
                {errors && errors.nom_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.nom_admin[0]}
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
                  name="prenom_admin"
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="First name"
                  value={prenom_admin}
                />
                {errors && errors.prenom_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.prenom_admin[0]}
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
                  name="phone_admin"
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Phone number"
                  value={phone_admin}
                />
                {errors && errors.phone_admin && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">
                    {errors.phone_admin[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Image:</label>
              <div className="md:w-10/12 w-full space-y-1">
                <div className="flex flex-col border rounded-lg items-center justify-center">
                  <div className="flex justify-center w-full md:h-64 h-40">
                    {imagePreview && (
                      <img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                  </div>
                  <div className="md:p-1 p-0 w-full">
                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                      <p className="text-xs md:text-sm">Select an image:</p>
                      <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                    </div>
                    <input type="file" id="imageInput" className="hidden" name="image_admin" onChange={handleChange} />
                  </div>
                </div>
                {errors && errors.image_admin && (
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
