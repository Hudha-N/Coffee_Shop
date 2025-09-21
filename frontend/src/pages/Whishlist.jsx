import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CategoryPage.module.css";

const userId = 1; // Replace with actual logged-in user id

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Load wishlist from backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/wishlist?user_id=${userId}`)
      .then((res) => setWishlistItems(res.data))
      .catch(() => setWishlistItems([]));
  }, []);

  // Add item to cart
  const handleAddToCart = (coffee) => {
    const userId = 1; // demo
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = coffee.coffee_id; // always use coffee_id from backend
    const existing = cart.find(i => i.product_id === productId);
    if (!existing) {
      cart.push({ product_id: productId, name: coffee.name, image: coffee.image, price: coffee.price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, items: cart })
    }).catch(() => {});
    navigate("/cart", { state: { highlightId: productId } });
  }

  // Remove item from wishlist
  const handleRemove = (coffee_id) => {
    axios
      .post("/api/wishlist/remove", { user_id: userId, coffee_id })
      .then(() => setWishlistItems(wishlistItems.filter(item => item.coffee_id !== coffee_id)));
  };

  return (
    <div>
      {/* Header */}
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumbNav}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Wishlist</span>
        </nav>
        <h2 className={styles.pageTitle}>Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Wishlist</h1>
    <p>Your saved products will appear here.</p>
  </div>
) : (
  <div className={styles.wishlistContainer}>
    {wishlistItems.map((coffee) => (
      <div key={coffee.coffee_id} className={styles.wishlistCard}>
        <img
          src={coffee.image}
          alt={coffee.name}
          className={styles.wishlistImage}
        />
        <div className={styles.cardInfo}>
          <h2 className={styles.name}>{coffee.name}</h2>
          <p className={styles.price}>${coffee.price}</p>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleAddToCart(coffee)}
              className={styles.addToCartBtn}
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleRemove(coffee.coffee_id)}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Wishlist;