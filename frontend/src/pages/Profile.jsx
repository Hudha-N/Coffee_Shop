import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";


function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/profile")
      .then(res => {
        setProfile(res.data);
        setForm({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          image: res.data.image || ""
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      image: profile.image
    });
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    axios.put("http://localhost:5000/api/users/profile", form)
      .then(res => {
        setProfile({ ...profile, ...form });
        setEditing(false);
      })
      .catch(() => setError("Failed to update profile."));
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return null;

  return (
    <div>
      
      <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img src={profile.image} alt={profile.fullName} className={styles.avatar} />
            </div>
            <div className={styles.nameRow}>
            {editing ? (
              <>
                <input name="fullName" value={form.fullName} onChange={handleChange} className={styles.nameInput} placeholder="Full Name" />
                <input name="email" value={form.email} onChange={handleChange} className={styles.nameInput} placeholder="Email" />
                <input name="phone" value={form.phone} onChange={handleChange} className={styles.nameInput} placeholder="Phone" />
                <input name="address" value={form.address} onChange={handleChange} className={styles.nameInput} placeholder="Address" />
                
                <div className={styles.buttonGroup}>
                  <button onClick={handleSave} className={styles.saveBtn}>Save</button>
                  <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                </div>

              </>
            ) : (
              <>
                <span className={styles.name}>{profile.fullName}</span>
                <span className={styles.email}>{profile.email}</span>
                <span className={styles.phone}>{profile.phone}</span>
                <span className={styles.address}>{profile.address}</span>
                <button onClick={handleEdit} className={styles.editBtn}>Edit</button>
              </>
            )}
          </div>
      
      </div>
      </div>
    </div>
  );
}

export default Profile;