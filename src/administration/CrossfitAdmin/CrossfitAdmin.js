import { useState } from "react";
import axios from "axios";
// import "./crossfitad.css";
import Crossmaterial from "./Crossfitmaterial";
function CrossfitAdmin() {
    const [judo, setjudo] = useState({
        nom_specialité: "",
        video_intro: null,
        description: "",
        emploi_sp: ""
    })
    console.log(judo);
    const handlsubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(judo?.video_intro);
            const res = await axios.post('http://127.0.0.1:8000/api/specialite', judo)
            console.log(res);

        } catch (error) {
            console.error(error);
        }

    }



    return <div className="w-screen h-screen">
        <div className="fff"><Crossmaterial /></div>
        <div className="judoadmin">
            <form className="formjudoad" method="post" onSubmit={handlsubmit}>
                <center><h1>cross-trainies specialitie</h1></center>
                <input type="text" name="nom_specialité" className="judo_sp" placeholder="nom specialite" onChange={(e) => {
                    setjudo({ ...judo, nom_specialité: e.target.value })
                }} />
                <label className="custom-file-upload">video specialite<input type="file" name="video_intro" className="judo_sp" placeholder="video specialite" onChange={(e) => {
                    setjudo({ ...judo, video_intro: e.target.files[0].name})
                }} /></label>
                <input type="text" name="description" className="judo_sp" placeholder="description" onChange={(e) => {
                    setjudo({ ...judo, description: e.target.value })
                }} />
                <label className="custom-file-upload">emplois specialite<input type="file" name="emploi_sp" className="judo_sp" onChange={(e) => {
                    setjudo({ ...judo, emploi_sp: e.target.files[0].name })
                }} /></label>
                <input type="submit" value="enregistrer" className="judo_sp" />
            </form>
            <div className="parentdecorad">
                <div className="childdecorad">
                    <h1 className="Eliad">E<p className="decoration">Elite</p></h1>
                </div>
            </div>
        </div>
        </div>


            }


export default CrossfitAdmin