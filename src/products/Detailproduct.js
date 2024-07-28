import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "../ScrollAnimation";
import React from 'react';
import Swal from 'sweetalert2';

export default function DetailProduct(props) {
  const { id_product } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [Loading, setLoading] = useState(true);
  const [commande, setCommande] = useState({
    id_user: user.users_id,
    produits_id: id_product,
    paiement: ""
  });

  useEffect(() => {
    handle();
  }, []);

  const handle = async () => {
    try {
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/produit/${id_product}`);
        setProduct(response.data);
        setLoading(false)
      } else {
        navigate("/join");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/commandecontroller/", commande);
      Swal.fire({
        icon: 'success',
        title: 'Commande réussie',
        text: 'Votre commande a été passée avec succès!',
        showConfirmButton: true,
      });
      navigate("/")
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la commande.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <ScrollAnimation>
      <div className="w-full h-screen">
        <div className="w-full h-full flex items-center justify-center">
          {Loading ? (
            <div className="loader">
              <div data-glitch="Loading..." className="glitch">Loading...</div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
                        <div className="flex w-1/3 flex-col justify-center items-center">
            <img src={`http://127.0.0.1:8000/storage/photos/product/${product.img_produit}`} alt="" />
            <div className="text-center mt-2 text-3xl font-bold text-red-700">{product.prix} MAD</div>
          </div>
          <div className="w-1/2">
            <div className="text-2xl font-bold text-white text-center">{product.nom_produit}</div>
            <div className="text-lg p-3">{product.desc_produit}</div>

            <form method="post" onSubmit={handleSubmit} className="p-3 space-y-3 flex flex-col">
              <label>
                <input
                  type="radio"
                  name="paiement"
                  value="Cachant delivrer"
                  onChange={(e) => {
                    setCommande({ ...commande, paiement: e.target.value });
                  }}
                />
                Cachant delivrer
              </label>
              <label>
                <input
                  type="radio"
                  value="Chez ELite"
                  name="paiement"
                  onChange={(e) => {
                    setCommande({ ...commande, paiement: e.target.value });
                  }}
                />
                Chez Elite
              </label>
              <button className="bg-red-700 w-full px-5 py-3 text-center rounded-lg">Buy Now</button>
            </form>

          </div>

            </div>

          )}

        </div>
      </div>
    </ScrollAnimation>
  );
}
