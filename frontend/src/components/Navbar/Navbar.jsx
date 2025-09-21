import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
         <img 
        src="/images/logo.png"   // place your logo.png in public/ folder
        alt="Cafforia"
        className={styles.logoImg}
      />
        <div className={styles.nav}>
          <nav className={styles.navLinks}>
            <Link
              to="/"
              className={`${styles.navLink} ${
                location.pathname === "/" ? styles.navLinkActive : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${styles.navLink} ${
                location.pathname === "/about" ? styles.navLinkActive : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${styles.navLink} ${
                location.pathname === "/contact" ? styles.navLinkActive : ""
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <div className={styles.right}>
        <Link
          to="/whishlist"
          className={styles.iconBtn}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="Wishlist"
            className={`${styles.icon} ${
              location.pathname === "/whishlist" ? styles.iconActive : ""
            }`}
          />
        </Link>

        <Link
          to="/cart"
          className={styles.iconBtn}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" 
            alt="Cart"
            className={`${styles.icon} ${
              location.pathname === "/cart" ? styles.iconActive : ""
            }`}
          />
        </Link>

        <Link
          to="/profile"
          className={styles.iconBtn}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9308/9308008.png"
            alt="Profile"
            className={`${styles.icon} ${
              location.pathname === "/profile" ? styles.iconActive : ""
            }`}
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
