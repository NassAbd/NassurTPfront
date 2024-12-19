import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  const [annonces, setannonces] = useState([]);
  const [newAnnonce, setNewAnnonce] = useState(null);
  const [showAnnonceForm, setShowAnnonceForm] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [updatedAnnonce, setUpdatedAnnonce] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/annonces", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setannonces(response.data);
      });
  }, []);

  const handleAddAnnonce = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/annonce", newAnnonce, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setNewAnnonce(null);
        setannonces([...annonces, response.data]);
      });
  };

  const handleUpdateAnnonce = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/update/${showUpdateForm}`, updatedAnnonce, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const updatedannonces = annonces.map((annonce) =>
          annonce._id === showUpdateForm ? response.data : annonce
        );
        setannonces(updatedannonces);
        setUpdatedAnnonce(null);
        setShowUpdateForm(null);
      });
  };

  const handleDeleteAnnonce = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this annonce?");
    if (confirmation) {
      axios
        .delete(`http://localhost:8080/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          setannonces(annonces.filter((annonce) => annonce._id !== id));
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const filteredAnnonces = annonces.filter(
    (annonce) => selectedCategorie === "" || annonce.categorie === selectedCategorie
  );

  return (
    <div>
      <NavBar />
      <h1>Liste des Annonces</h1>
      <button onClick={handleLogout}>Déconnexion</button>

      <button onClick={() => setShowAnnonceForm(!showAnnonceForm)}>Ajouter une annonce</button>

      <select
        value={selectedCategorie}
        onChange={(e) => setSelectedCategorie(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        <option value="Immobilier">Immobilier</option>
        <option value="Véhicules">Véhicules</option>
        <option value="Électronique">Électronique</option>
        <option value="Emplois">Emplois</option>
        <option value="Loisirs">Loisirs</option>
      </select>

      {showAnnonceForm && (
        <form onSubmit={handleAddAnnonce}>
          <input
            type="text"
            placeholder="Titre"
            value={newAnnonce?.title || ""}
            onChange={(e) => setNewAnnonce({ ...newAnnonce, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="description"
            value={newAnnonce?.description || ""}
            onChange={(e) => setNewAnnonce({ ...newAnnonce, description: e.target.value })}
          />
          <select
            value={newAnnonce?.categorie || ""}
            onChange={(e) => setNewAnnonce({ ...newAnnonce, categorie: e.target.value })}
          >
            <option value="" disabled>
              Sélectionner une catégorie
            </option>
            <option value="Immobilier">Immobilier</option>
            <option value="Véhicules">Véhicules</option>
            <option value="Électronique">Électronique</option>
            <option value="Emplois">Emplois</option>
            <option value="Loisirs">Loisirs</option>
          </select>
          <input
            type="text"
            placeholder="prix (€)"
            value={newAnnonce?.prix || ""}
            onChange={(e) => setNewAnnonce({ ...newAnnonce, prix: e.target.value })}
          />
          <button type="submit">Ajouter</button>
        </form>
      )}

      <ul>
        {filteredAnnonces.map((annonce) => (
          <li key={annonce.id}>
            <h3>{annonce.title}</h3>
            <p>{annonce.prix} €</p>
            <Link to={`/annonce/${annonce._id}`}>
              <button>Voir l'annonce</button>
            </Link>
            <button onClick={() => setShowUpdateForm(annonce._id)}>Modifier</button>
            {showUpdateForm === annonce._id && (
              <form onSubmit={(e) => handleUpdateAnnonce(e, annonce._id)}>
                <input
                  type="text"
                  placeholder="Titre"
                  value={updatedAnnonce?.title || ""}
                  onChange={(e) =>
                    setUpdatedAnnonce({ ...updatedAnnonce, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="description"
                  value={updatedAnnonce?.description || ""}
                  onChange={(e) =>
                    setUpdatedAnnonce({
                      ...updatedAnnonce,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="categorie"
                  value={updatedAnnonce?.categorie || ""}
                  onChange={(e) =>
                    setUpdatedAnnonce({ ...updatedAnnonce, categorie: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="prix (€)"
                  value={updatedAnnonce?.prix || ""}
                  onChange={(e) =>
                    setUpdatedAnnonce({ ...updatedAnnonce, prix: e.target.value })
                  }
                />
                <button type="submit">Modifier</button>
              </form>
            )}
            <button onClick={() => handleDeleteAnnonce(annonce._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
