import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace URL with your backend API endpoint
      const response = await axios.post("http://localhost:5000/api/login", formData);
      const token = response.data.token;
      const role = response.data.role;

      // Save JWT token & role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login successful!");
      navigate("/"); // Redirect to protected home/dashboard
    } catch (error) {
      console.error(error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
