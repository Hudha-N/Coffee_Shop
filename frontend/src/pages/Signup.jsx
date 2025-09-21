import React, { useState } from "react";
import axios from "axios";


const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", form);
      setMessage(res.data.message || "Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div>
      
      <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} /><br />
        <button type="submit">Sign Up</button>
      </form>
      <div style={{ color: "red", marginTop: 8 }}>{message}</div>
      </div>
    </div>
  );
};

export default Signup;