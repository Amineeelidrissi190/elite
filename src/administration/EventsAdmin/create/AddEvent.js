import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import plus from "../../../fitness/plus.png";
import Swal from "sweetalert2";
export default function AddEvent() {
  const [nom_event, setNomEvent] = useState("");
  const [description_event, setDescriptionEvent] = useState("");
  const [date_event, setDateEvent] = useState("");
  const [imageEvent, setImageEvent] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const formData = new FormData();
    formData.append("nom_event", nom_event);
    formData.append("description_event", description_event);
    formData.append("date_event", date_event);
    formData.append("image_Event", imageEvent);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/event/", formData);
      navigate("/AfficherEvent");
      Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
          showConfirmButton: true,
        });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <div className="w-full md:mx-4 mx-0">
      <form onSubmit={handle} className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
        <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
          <h1 className="text-sm">Events</h1>
          <input type="submit" value="Add" className="text-green-600 hover:underline cursor-pointer py-2" />
        </div>

        <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Event Name:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Event name"
                  name="nom_event"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  onChange={(e) => setNomEvent(e.target.value)}
                />
                {errors && errors.nom_event && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.nom_event[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="text"
                  placeholder="Event description"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  name="description_event"
                  onChange={(e) => setDescriptionEvent(e.target.value)}
                />
                {errors && errors.description_event && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.description_event[0]}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
              <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Event Date:</label>
              <div className="md:w-10/12 w-full">
                <input
                  type="date"
                  placeholder="Event date"
                  className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg"
                  name="date_event"
                  onChange={(e) => setDateEvent(e.target.value)}
                />
                {errors && errors.date_event && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.date_event[0]}</p>
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
                    {imageEvent && (
                      <img src={URL.createObjectURL(imageEvent)} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                  </div>
                  <div className="md:p-1 p-0 w-full">
                    <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                      <p className="text-xs md:text-sm">Select an image:</p>
                      <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                    </div>
                    <input type="file" id="imageInput" className="hidden" name="image_Event" onChange={(e) => setImageEvent(e.target.files[0])} />
                  </div>
                </div>
                {errors && errors.image_Event && (
                  <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.image_Event[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
