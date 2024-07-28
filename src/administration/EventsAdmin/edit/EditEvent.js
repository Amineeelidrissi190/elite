import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import pen from "../../../fitness/pen.png"
import Swal from "sweetalert2";
export default function EditEvent() {
    const { id_Event } = useParams();
    const [nom_event, setNom_event] = useState("");
    const [image_Event, setImage_Event] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description_event, setDescription_Event] = useState("");
    const [date_event, setDate_Event] = useState("");

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        handleGet();
    }, []);

    const handleGet = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/event/${id_Event}`);
            const data = response.data;
            setNom_event(data.nom_event);
            setDescription_Event(data.description_event);
            setDate_Event(data.date_event);
            setImage_Event(data.image_Event);
            setImagePreview(`http://127.0.0.1:8000/storage/photos/Event/${data.image_Event}`);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("nom_event", nom_event);
        formData.append("description_event", description_event);
        formData.append("date_event", date_event);


        if (image_Event !== null && typeof image_Event !== 'string') {
            formData.append("image_Event", image_Event);
        }
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/event/${id_Event}`, formData);
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
            } else {
                console.log(error);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Event(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} method="post" className="flex flex-col items-center justify-center w-full p-2 space-y-5 rounded-lg">
                <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                    <h1 className="text-sm">Events</h1>


                    <input type="submit" value="Edit" className="py-2 text-yellow-400 hover:underline cursor-pointer" />



                </div>

                <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">

                    <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Event Name:</label>
                        <div className="md:w-10/12 w-full">
                            <input type="text" value={nom_event} name="nom_event" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => { setNom_event(e.target.value); }} />
                            {errors && errors.nom_event && <p className="text-red-700 w-fit self-start">{errors.nom_event[0]}</p>}
                        </div>
                    </div>

                    <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description :</label>

                        <div className="md:w-10/12 w-full">
                        <input type="text" value={description_event} placeholder="Event description" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="description_event" onChange={(e) => { setDescription_Event(e.target.value); }} />
                        {errors && errors.description_event && <p className="text-red-700 w-fit self-start">{errors.description_event[0]}</p>} {/* Afficher l'erreur description_event */}

                        </div>

                    </div>
                    <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Event date :</label>
                        <div className="md:w-10/12 w-full">
                        <input type="date" value={date_event} placeholder="date Event" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="date_Event" onChange={(e) => { setDate_Event(e.target.value); }} />
                        {errors && errors.date_event && <p className="text-red-700 w-fit self-start">{errors.date_event[0]}</p>} {/* Afficher l'erreur date_event */}

                        </div>
                    </div>
                    <div className="w-full flex md:flex-row flex-col md:items-start items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                        <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">image :</label>
                        <div className="flex flex-col border w-10/12 rounded-lg items-center justify-center">
                            <div className="flex justify-center w-full md:h-64 h-40">
                                <img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                            </div>
                            <div className="md:p-1 p-0 w-full">
                                <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                    <p className="text-xs md:text-sm">Select an image:</p>
                                    <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                                </div>
                                <input type="file" id="imageInput" className="hidden" name="image_Event" onChange={handleImageChange} />
                            </div>
                            {errors && errors.image_Event && <p className="text-red-700 w-fit self-start px-36">{errors.image_Event[0]}</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
