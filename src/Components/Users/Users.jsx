import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      });
  }, []);


  const updateUser = (e) => {
    e.preventDefault();
    axios
     .put(`http://localhost:8080/users/${showUpdateForm}`, updatedUser, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
     .then((response) => {
        console.log(response.data);
        const updatedusers = users.map((user) =>
            user._id === showUpdateForm ? response.data : user
          );
        setUsers(updatedusers);
        setUpdatedUser(null);
        setShowUpdateForm(null);
      });
  }


  const deleteUser = (userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');

    if (confirmation) {
    axios
     .delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
     .then((response) => {
        console.log(response.data);
        setUsers(users.filter((u) => u._id!== userId));
      });
    }
  };

  return (
    <div>
      <NavBar />  
      <h2>Liste des utilisateurs</h2>

      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => deleteUser(user._id)}>Supprimer</button>
          <button onClick={() => setShowUpdateForm(user._id)}>
                Modifier
          </button>
          
          {showUpdateForm === user._id && (
        <form onSubmit={(e) => updateUser(e, user._id)}>
          <input
            type="text"
            placeholder="name"
            value={updatedUser?.name || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={updatedUser?.password || ""}
            onChange={(e) => setUpdatedUser({...updatedUser, password: e.target.value})}
        />
          <button type="submit">Modifier</button>
        </form>
      )}
        </div>
      ))}
    </div>
  );
};

export default Users;