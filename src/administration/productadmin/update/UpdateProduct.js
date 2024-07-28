import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import pen from "../../../fitness/pen.png"
import Swal from "sweetalert2"
export default function UpdateProduct() {
    const { id_product } = useParams()
    const [nom_produit, setnom_produit] = useState("")
    const [img_produit, setimg_produit] = useState(null)
    const [desc_produit, setdesc_produit] = useState("")
    const [errors, setErrors] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [prix, setprix] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        handleget();
    }, []);
    const handleget = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`http://127.0.0.1:8000/api/produit/${id_product}`)
            const data = response.data
            setnom_produit(data.nom_produit)
            setimg_produit(data.img_produit)
            setdesc_produit(data.desc_produit)
            setImagePreview(`http://127.0.0.1:8000/storage/photos/product/${data.img_produit}`)
            setprix(data.prix)

        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
            console.log(error)
        }
    }
    const handle = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("_method", "PATCH");
        formdata.append("nom_produit", nom_produit)
        formdata.append("desc_produit", desc_produit)
        formdata.append("prix", prix)
        if (img_produit !== null && typeof img_produit !== 'string') {
            formdata.append("img_produit", img_produit)
        }
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/produit/${id_product}`, formdata)
            navigate("/AfficherProduct")
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
                showConfirmButton: true,
              });
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
            console.log(error)
        }


    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimg_produit(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    return <div className="w-full md:mx-4 mx-0">
        <form action="" onSubmit={handle} method="post" className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
            <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-5 rounded-lg">
                <h1 className="text-sm">Products</h1>
                <input type="submit" value="Edit" className="text-yellow-400 hover:underline cursor-pointer" />
            </div>


            <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Name:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" placeholder="Product name" name="nom_produit" value={nom_produit} className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => {
                            setnom_produit(e.target.value)
                        }} />
                        {errors && errors.nom_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.nom_produit[0]}</p>}
                    </div>

                </div>
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" value={desc_produit} placeholder="Product description" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="desc_produit" onChange={(e) => {
                            setdesc_produit(e.target.value)
                        }} />
                        {errors && errors.desc_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.desc_produit[0]}</p>}
                    </div>

                </div>

                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">price:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" placeholder="Product price" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="prix" value={prix} onChange={(e) => {
                            setprix(e.target.value)
                        }} />
                        {errors && errors.prix && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.prix[0]}</p>}


                    </div>

                </div>
                <div className="w-full flex md:flex-row flex-col md:items-start items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">image :</label>
                    <div className="flex flex-col border md:w-10/12 w-full rounded-lg items-center justify-center">
                        <div className="flex justify-center w-full md:h-64 h-40">
                            <img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </div>
                        <div className="md:p-1 p-0 w-full">
                            <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                <p className="text-xs md:text-sm">Select an image:</p>
                                <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                            </div>
                            <input type="file" id="imageInput" className="hidden" name="img_produit" onChange={handleImageChange} />
                        </div>

                    </div>
                </div>

                {errors && errors.img_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.img_produit[0]}</p>}

            </div>




        </form>
    </div>
}