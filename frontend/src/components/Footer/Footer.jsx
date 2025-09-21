// Footer.js
import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <h2 className={styles.logo}> <img 
                  src="/images/logo.png"   // place your logo.png in public/ folder
                  alt="Cafforia"
                  className={styles.logoImg}
                /></h2>
          <p className={styles.desc}>
             Brewing happiness, one cup at a time.
          </p>
        </div>

        {/* Middle Section */}
        <div className={styles.middle}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <h3>Follow Us</h3>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>copyright © {new Date().getFullYear()} Cafforia coffee shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
