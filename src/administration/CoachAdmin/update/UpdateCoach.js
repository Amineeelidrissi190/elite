import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCoach() {
  const { id_coach } = useParams();
  const navigate = useNavigate();
  const [nom_coach, setNom_coach] = useState("");
  const [prenom_coach, setPrenom_coach] = useState("");
  const [phone_coach, setPhone_coach] = useState("");
  const [image_coach, setImage_coach] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [users_id, setusers_id] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res1 = await axios.get(`http://127.0.0.1:8000/api/coach/${id_coach}`);
      setNom_coach(res1.data.nom_coach);
      setPrenom_coach(res1.data.prenom_coach);
      setPhone_coach(res1.data.phone_coach);
      setDescription(res1.data.description);
      setImage_coach(res1.data.image_coach);
      setusers_id(res1.data.users_id);
      setImagePreview(`http://127.0.0.1:8000/storage/photos/coach/${res1.data.image_coach}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setImage_coach(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      switch (e.target.name) {
        case "nom_coach":
          setNom_coach(e.target.value);
          break;
        case "prenom_coach":
          setPrenom_coach(e.target.value);
          break;
        case "phone_coach":
          setPhone_coach(e.target.value);
          break;
        case "description":
          setDescription(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nom_coach", nom_coach);
    formData.append("prenom_coach", prenom_coach);
    formData.append("phone_coach", phone_coach);
    formData.append("description", description);
    formData.append("users_id", users_id);

    if (image_coach !== null && typeof image_coach !== 'string') {
      formData.append("image_coach", image_coach);
    }

    try {
      const res2 = await axios.post(
        `http://127.0.0.1:8000/api/coach/${id_coach}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res2.data.message);
      navigate("/AfficherCoach");
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
        className="flex flex-col items-center justify-center w-full p-2 space-y-5 rounded-lg"
      >
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-lg">Coaches</h1>
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
                  name="nom_coach"
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Family name"
                  value={nom_coach}
                />
                {errors && errors.nom_coach && (
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
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="First name"
                  value={prenom_coach}
                />
                {errors && errors.prenom_coach && (
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
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Phone number"
                  value={phone_coach}
                />
                {errors && errors.phone_coach && (
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
                  onChange={handleChange}
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  placeholder="Description"
                  value={description}
                />
                {errors && errors.description && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.description[0]}</p>
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
                    {imagePreview && (
                      <img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                  </div>
                  <div className="md:p-1 p-0 w-full">
                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                      <p className="text-xs md:text-base">Select an image:</p>
                      <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-base md:py-3 px-3 py-2 rounded-lg">Browse</label>
                    </div>
                    <input type="file" id="imageInput" className="hidden" name="image_coach" onChange={handleChange} />
                  </div>
                </div>
                {errors && errors.image_coach && (
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
