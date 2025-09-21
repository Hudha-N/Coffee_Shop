import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {  Link } from "react-router-dom";
import styles from "./CategoryPage.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const userId = 1; // demo user
  const [items, setItems] = useState([]);
  const location = useLocation();
  const highlightId = location.state && location.state.highlightId;
  const rowRefs = React.useRef({});

  useEffect(() => {
    // prefer loading from backend cart; fallback to localStorage
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(res => setItems(res.data))
      .catch(() => {
        const local = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(local);
      });
  }, []);

  // if arrived with a highlightId, scroll to and highlight that row
  useEffect(() => {
    if (!highlightId) return;
    const el = rowRefs.current[highlightId];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.transition = 'box-shadow 0.2s ease-in-out';
      el.style.boxShadow = '0 0 0 4px rgba(111,78,55,0.2)';
      setTimeout(() => { if (el) el.style.boxShadow = ''; }, 2500);
    }
  }, [highlightId, items]);

  const saveToBackend = (newItems) => {
  const itemsToSave = newItems.map(i => ({
    product_id: i.id,
    quantity: i.quantity || 1
  }));
  axios.post('http://localhost:5000/api/cart', { user_id: userId, items: itemsToSave })
    .then(() => {})
    .catch(() => console.warn('Failed to sync cart to backend'));
};

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const newItems = items.map(i => i.id === id ? { ...i, quantity: qty } : i);
    setItems(newItems);
    saveToBackend(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeItem = (id) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    saveToBackend(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const handleProceed = () => {
    // ensure backend has the latest
    navigate('/checkout');
  };

  const total = items.reduce((s, it) => s + (parseFloat(it.price || 0) * (it.quantity || 1)), 0);

  return (
    <div>
     {/* Header section */}
            <div className={styles.headerSection}>
              <nav className={styles.breadcrumbNav}>
                <Link to="/" className={styles.breadcrumbLink}>
                  Home
                </Link>
                <span className={styles.breadcrumbDivider}>/</span>
                <span className={styles.breadcrumbCurrent}>My Cart</span>
              </nav>
              <h2 className={styles.pageTitle}>My Cart</h2>
            </div>
      <div className={styles.cartContainer}>
      {items.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr
                  key={item.id}
                  ref={r => rowRefs.current[item.id] = r}
                  className={styles.cartRow}
                >
                  <td className={styles.productCell}>
                    <img src={item.image} alt={item.name} />
                    <div>{item.name}</div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button className={styles.qtyButton} onClick={() => updateQty(item.id, (item.quantity || 1) - 1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button className={styles.qtyButton} onClick={() => updateQty(item.id, (item.quantity || 1) + 1)}>+</button>
                  </td>
                  <td>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <button className={styles.removeButton} onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.cartFooter}>
            <div>
              <strong>Total: </strong>${total.toFixed(2)}
            </div>
            <button className={styles.checkoutButton} onClick={handleProceed}>Proceed To Checkout</button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Cart;
