import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import plus from "../../../fitness/plus.png"
export default function AddProduct() {
    const [nom_produit, setnom_produit] = useState("")
    const [img_produit, setimg_produit] = useState(null)
    const [errors, setErrors] = useState(null); // État pour stocker les erreurs
    const [desc_produit, setdesc_produit] = useState("")
    const [prix, setprix] = useState("")
    const navigate = useNavigate()
    const handle = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        formdata.append("nom_produit", nom_produit)
        formdata.append("img_produit", img_produit)
        formdata.append("desc_produit", desc_produit)
        formdata.append("prix", prix)
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/produit/", formdata)
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
                // Stocker les erreurs dans l'état des erreurs
                setErrors(error.response.data.errors);
            } else {
                console.log(error);
            }
            console.log(error)
        }


    }
    return <div className="w-full md:mx-4 mx-0">
        <form action="" onSubmit={handle} method="post" className="flex flex-col items-center justify-center w-full p-2 space-y-2 rounded-lg">
            <div className="bg-slate-950 w-full flex items-center justify-between px-5 py-3 rounded-lg">
                <h1 className="text-sm">Products</h1>
                <input type="submit" value="Add" className="text-green-600 hover:underline cursor-pointer py-2" />
            </div>
            <div className="w-full bg-slate-950 p-2 rounded-lg flex flex-col items-center space-y-2">
                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Name:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" placeholder="Product name" name="nom_produit" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" onChange={(e) => {
                            setnom_produit(e.target.value)
                        }} />
                        {errors && errors.nom_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.nom_produit[0]}</p>}
                    </div>

                </div>


                <div className="w-full flex md:flex-row flex-col items-baseline md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">Description:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" placeholder="Product description" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="desc_produit" onChange={(e) => {
                            setdesc_produit(e.target.value)
                        }} />
                        {errors && errors.desc_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start">{errors.desc_produit[0]}</p>}

                    </div>

                </div>



                <div className="w-full flex md:flex-row flex-col items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">price:</label>
                    <div className="md:w-10/12 w-full">
                        <input type="text" placeholder="Product price" className="p-1 md:text-sm text-xs focus:border-red-700 outline-none w-full h-12 bg-transparent border rounded-lg" name="prix" onChange={(e) => {
                            setprix(e.target.value)
                        }} />
                        {errors && errors.prix && <p className="text-red-700 w-fit md:text-sm text-xs self-start ">{errors.prix[0]}</p>}

                    </div>

                </div>


                <div className="w-full flex md:flex-row flex-col md:items-start items-center md:justify-center md:space-y-0 space-y-2 md:space-x-3 space-x-0">
                    <label className="md:w-1/12 w-10/12 text-white md:text-sm text-xs">image :</label>
                    <div className="flex flex-col border w-10/12 rounded-lg items-center justify-center">

                        <div className="flex justify-center w-full md:h-64 h-40">
                            {img_produit && (
                                <img src={URL.createObjectURL(img_produit)} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                            )}
                        </div>
                        <div className="md:p-1 p-0 w-full">
                            <div className="flex items-center justify-between md:p-3 space-x-1 p-2">
                                <p className="text-xs md:text-sm">Select an image:</p>
                                <label htmlFor="imageInput" className="cursor-pointer bg-slate-800 text-white md:px-5 text-xs md:text-sm md:py-3 px-3 py-2 rounded-lg">Browse</label>
                            </div>

                            <input type="file" id="imageInput" className="hidden" name="img_produit" onChange={(e) => {
                                setimg_produit(e.target.files[0])
                            }} />
                        </div>
                    </div>
                </div>
                {errors && errors.img_produit && <p className="text-red-700 w-fit md:text-sm text-xs self-start md:px-36 px-5">{errors.img_produit[0]}</p>}
            </div>



        </form>
    </div>

}
