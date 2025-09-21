import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      // Save token to localStorage for authentication
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("");
        navigate("/"); // Redirect to home page
      } else {
        setMessage(res.data.message || "Login successful!");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>     
      <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
      <div style={{ color: "red", marginTop: 8 }}>{message}</div>
      </div>
    </div>
  );
};

export default Login;