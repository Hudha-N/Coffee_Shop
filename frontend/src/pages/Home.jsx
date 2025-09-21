import React, { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories/Categories";
import axios from 'axios';
import styles from "./CategoryPage.module.css";
import {  Link } from "react-router-dom";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/messages');
        setMessages(res.data);
      } catch (e) {
        // ignore
      }
    };
    load();
  }, []);

  // horizontal scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 270; // width of one card
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
 

 

  return (
    <div>
      
       {/* 👇 Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Welcome to Coffee Haven</h1>
          <p className={styles.welcomeSubtitle}>
            Discover the finest espresso blends, brewed with love for true coffee
            lovers.
          </p>
          <Link to="/Espresso">
          <button className={styles.exploreBtn}>Explore Now</button>
          </Link>
        </div>
      </section>
      <Categories />
      
      <section className={styles.section}>
      <h3 className={styles.heading}>Messages From Customers</h3>

      <button className={`${styles.arrow} ${styles.left}`} onClick={() => scroll("left")}>
        ‹
      </button>
      <button className={`${styles.arrow} ${styles.right}`} onClick={() => scroll("right")}>
        ›
      </button>

<div className={styles.scrollArea} ref={scrollRef}>
  {messages.map((m) => (
    <div key={m.id} className={styles.card}>
      <div className={styles.name}>{m.name}</div>
      <div className={styles.message}>{m.message}</div>
    </div>
  ))}
</div>

    </section>
    </div>
  );
};

export default Home;
