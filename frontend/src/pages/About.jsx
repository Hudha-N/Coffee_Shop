import React from "react";
import "./About.css";
import {  Link } from "react-router-dom";
import styles from "./CategoryPage.module.css";

const AboutUs = () => {
  

  return (
    <div className="about-page">
      {/* Header section */}
                  <div className={styles.headerSection}>
                    <nav className={styles.breadcrumbNav}>
                      <Link to="/" className={styles.breadcrumbLink}>
                        Home
                      </Link>
                      <span className={styles.breadcrumbDivider}>/</span>
                      <span className={styles.breadcrumbCurrent}>About us</span>
                    </nav>
                    <h2 className={styles.pageTitle}>About us</h2>
                  </div>
 

      {/* Who We Are */}
      <section className="about-container">
        <div className="about-image">
          <img src="\images\coffee1.jpeg" alt="About" />
        </div>
        <div className="about-content">
          <h2>We Work for Your Incredible Success</h2>
          <p className={"text"}>
          Welcome to <strong>Cafforia coffee shop</strong>, where every cup tells a story.
          We serve freshly brewed coffee, handcrafted beverages, and delicious treats in a cozy, welcoming atmosphere.
          Our beans are carefully sourced to ensure the perfect aroma and flavor in every cup.
        </p>
        <p className="text">
          It’s not just about coffee—it’s about creating a space where friends meet, ideas flow, and moments are savored.
          Whether you’re grabbing a quick espresso or relaxing with a latte, we promise a memorable café experience every time.
        </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <div className="why-container">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-box">
            <h3>Premium Quality</h3>
            <p>We handpick only the finest beans and roast them to perfection.</p>
          </div>
          <div className="why-box">
            <h3>Sustainable</h3>
            <p>Eco-friendly cups and ethical sourcing to protect our planet.</p>
          </div>
          <div className="why-box">
            <h3>Cozy Atmosphere</h3>
            <p>A warm and welcoming place to relax, work, or meet friends.</p>
          </div>
          <div className="why-box">
            <h3>Fast Service</h3>
            <p>Baristas trained to craft your perfect cup quickly and with love.</p>
          </div>
          <div className="why-box">
            <h3>Tasty Treats</h3>
            <p>Delicious pastries and snacks to complement your coffee.</p>
          </div>
          <div className="why-box">
            <h3>Great Vibes</h3>
            <p>Chill music and cozy corners to make your time memorable.</p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="story-container">
        
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            CoffeeTime started as a small family café with a big dream:  
            to share the joy of fresh, authentic coffee with our community.  
            What began as a cozy corner shop quickly became a gathering spot 
            for coffee lovers from all walks of life.
          </p>
          <p>
            Every cup we brew reflects our journey — from sourcing ethical beans, 
            to experimenting with unique flavors, to creating a warm atmosphere 
            where memories are made.  
          </p>
          <p>
            For us, coffee is more than a drink — it’s a way of connecting people.  
            And our story is just getting started.
          </p>
        </div>
        <div className="story-image">
          <img
            src={require('../assets/coffee_shop.jpg')}
            alt="Our Story"
          />
        </div>
      </div>
    

      </div>
  );
};

export default AboutUs;
