import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AffichageSpecialities.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../navbar/logo.png";
import menucon from "../../../fitness/menucon.png";
import deleteicon from "../../../fitness/deleteicon.png";
import editic from "../../../fitness/editic.png";

export default function AffichageSpecialites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    res2();
  }, []);

  const res2 = async () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get("http://127.0.0.1:8000/api/specialite");
    setData(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Attention',
      text: "Are you sure to delete this category?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`http://127.0.0.1:8000/api/specialite/${id}`)
          .then(response => {
            Swal.fire({
              icon:'success',
              title:"Success",
              text:"The category has been deleted."
            });
            res2();
          })
          .catch(error => {
            Swal.fire({
              icon : 'error',
              title:"Error",
              text : 'You should delete all offers related to this categorie',
              
            }

            );
          });
      }
    });
  };

 

  return (
    <div className="w-full mx-2 flex my-2 flex-col overflow-x-hidden space-y-2">
      <div className='w-full text-white flex justify-between px-5 bg-gray-950 py-5 rounded-lg'>
        <h1 className='px-2 text-sm'>Categories</h1>
        <Link to="/create" className="hover:underline text-green-400 text-sm">Add category</Link>
      </div>
      <div className="space-y-3 overflow-x-auto rounded-lg overflow-y-hidden block w-full">
        <table className="w-full bg-slate-950 rounded-lg">
          <thead className="bg-slate-800 border-b text-sm whitespace-nowrap text-center border-black">
            <tr>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">speciality</th>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">video introduction</th>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">description</th>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">price</th>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">emploi specialite</th>
              <th className="md:w-1/6 min-w-[120px] font-normal text-white">Action</th>
            </tr>
          </thead>
          <tbody className="rounded-lg">
            {data.length > 0 && data.map((e, index) => {
              return (
                <tr key={index} className="border-b text-sm border-slate-900">
                  <td className="md:w-1/6 min-w-[120px] text-center font-normal text-white">{e.nom_specialité}</td>
                  <td className="md:w-1/6 min-w-[120px] font-normal text-center text-white">{e.video_intro}</td>
                  <td className="md:w-1/6 min-w-[200px] font-normal text-xs py-2 text-white">{e.description}</td>
                  <td className="md:w-1/6 min-w-[120px] text-center font-normal text-white">{e.price}</td>
                  <td className="md:w-1/6 min-w-[120px] text-center font-normal text-white">{e.emploi_sp}</td>
                  <td className="md:w-1/6 min-w-[120px] text-center font-normal text-white">
                    <div className="flex items-center justify-center space-x-3">
                      <button onClick={() => handleDelete(e.id)} className="flex items-center justify-center hover:underline text-red-700">Delete</button>
                      <Link to={`/edit/${e.id}`} className="flex items-center justify-center hover:underline text-yellow-400">Edit</Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
