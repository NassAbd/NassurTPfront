import axios, { AxiosHeaders } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => {
        alert("Compte crée avec succès");
        navigate("/login");
      })
      .catch((error) => {
        alert("Erreur lors de la création du compte");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {/* button for navigate to login */}
      <button onClick={() => navigate("/login")}>Se connecter</button>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
