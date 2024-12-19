import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import NavBar from "./../NavBar/NavBar";

const Annonce = () => {
  const annonceId = useParams();
  const Id = annonceId.id
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/annonce/${Id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setAnnonce(response.data);
      });
  }, [annonceId]);

  if (!annonce) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>{annonce.title}</h1>
      <p><strong>description :</strong>  {annonce.description}</p>
      <p><strong>categorie :</strong> {annonce.categorie}</p>
      <p><strong>prix :</strong> {annonce.prix} €</p>
      <p><strong>user :</strong> {annonce.user}</p>
    </div>
  );
};

export default Annonce;