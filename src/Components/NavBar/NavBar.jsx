import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
    const [name, setName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token is missing or invalid");
            setError("No valid token found");
            return;
        }

        try {
            console.log("🚀 ~ NavBar ~ token:", token);
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
            setName(decodedToken.name || "Unknown User");
        } catch (err) {
            console.error("Error decoding token:", err.message);
            setError("Failed to decode token");
        }
    }, []); // [] ensures this effect runs only once, when the component mounts.

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <nav>
                <h1>
                    <a href="/home">Home</a> | Bonjour {name} | <a href="/users">Users</a>
                </h1>
            </nav>
        </div>
    );
};

export default NavBar;
