import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/dashboard/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res.data.name);
      } catch (error) {
        console.error(error);
        // If token invalid or missing, redirect to login
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Welcome, {name} (Admin)</h2>
      <p>Manage doctors and patients here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
