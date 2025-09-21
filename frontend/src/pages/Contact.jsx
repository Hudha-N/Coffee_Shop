import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
import './Contact.css';
import styles from "./CategoryPage.module.css";



const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return setStatus('Please fill out all fields.');
    }
    try {
      await axios.post('/api/messages', { name, email, message });
      setStatus('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('Failed to send the message.');
    }
  };

  return (
    <div className="contact-page">
      {/* Header section */}
            <div className={styles.headerSection}>
              <nav className={styles.breadcrumbNav}>
                <Link to="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
                <span className={styles.breadcrumbDivider}>/</span>
                <span className={styles.breadcrumbCurrent}>Contact us</span>
              </nav>
              <h2 className={styles.pageTitle}>Contact us</h2>              
            </div>
      
      <div className="contact-info">
        <div className="contact-box">
          <h3>Office Location</h3>
          <p>23, Avenue de Paris<br />75012 Paris</p>
        </div>
        <div className="contact-box">
          <h3>Working Hours</h3>
          <p>Mon - Fri: 10am - 6pm<br />Sat: 10am - 2pm</p>
        </div>
        <div className="contact-box">
          <h3>Communication</h3>
          <p>Email: hello@coffee.shop</p>
          <p>Phone: +33619530144</p>
        </div>
      </div>
      <div className="contact-section">
  <div className="contact-container">
    {/* Left side: description / quote */}
    <div className="contact-left">
      <h2>Get In Touch</h2>
      <p>
        We'd love to hear from you! Whether it's a question about our coffees,
        a collaboration, or feedback, send us a message and we'll respond promptly.
      </p>
    </div>

    {/* Right side: contact form */}
    <div className="contact-right">
      <form onSubmit={sendMessage} className="contact-form">
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="What’s your name?" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Your email" 
          required 
        />
        <textarea 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Message" 
          required 
        />
        <button type="submit" className="send-btn">Send Message</button>
        <div className="status">{status}</div>
      </form>
    </div>
  </div>
</div>
</div>
  );
};

export default Contact;
