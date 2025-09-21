import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./CategoryPage.module.css";
import { useNavigate } from "react-router-dom";


const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [userId] = useState(1); // Example: logged-in user ID
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get cart items from backend
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log(err));

    // Get saved billing info
    axios
      .get(`/api/users/profile`)
      .then((res) => setBilling(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || item.qty || 1),
    0
  );
  const discount = subtotal > 100 ? subtotal * 0.2 : 0; // Example: 20% discount
  const total = subtotal - discount;

  const handleInputChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const validateForm = () => {
  let newErrors = {};

  // First name
  if (!billing.firstName) newErrors.firstName = "First name is required";

  // Last name
  if (!billing.lastName) newErrors.lastName = "Last name is required";

  // Address
  if (!billing.address) newErrors.address = "Address is required";

  // Phone
  if (!/^\d{10}$/.test(billing.phone)) {
    newErrors.phone = "Phone number must be exactly 10 digits";
  }

  // Email
  if (!billing.email.includes("@")) {
    newErrors.email = "Email must include '@'";
  }

  // Card details validation only if Card selected
  if (paymentMethod === "Card") {
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format";
    } else {
      // Past date check
      const [month, year] = cardDetails.expiry.split("/");
      const expDate = new Date(`20${year}`, month - 1); // expiry year
      const now = new Date();
      if (expDate < now) {
        newErrors.expiry = "Expiry date cannot be in the past";
      }
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // true if no errors
};


const handlePlaceOrder = () => {
  if (!validateForm()) {
    return; // stop if errors exist
  }

  // Success popup
  Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text:
      paymentMethod === "Cash"
        ? "Your order has been placed successfully"
        : "Your payment was successful",
    confirmButtonColor: "#3085d6",
  }).then(() => {
    navigate("/"); // redirect to Home
  });
};


  return (
    <div>
      {/* Header section */}
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumbNav}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <Link to="/Cart" className={styles.breadcrumbLink}>
            My Cart
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Checkout</span>
        </nav>
        <h2 className={styles.pageTitle}>Checkout</h2>
      </div>

      <div className={styles.checkoutContainer}>
        {/* Billing form */}
        <div className={styles.checkoutForm}>
          <h2>Billing Information</h2>
          <input
            name="firstName"
            placeholder="First name"
            value={billing.firstName || ""}
            onChange={handleInputChange}
            className={errors.firstName ? styles.inputError : ""}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
          
          <input
            name="lastName"
            placeholder="Last name"
            value={billing.lastName || ""}
            onChange={handleInputChange}
          className={errors.lastName ? styles.inputError : ""}
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <input
            name="address"
            placeholder="Address"
            value={billing.address || ""}
            onChange={handleInputChange}
          className={errors.address ? styles.inputError : ""}
          />
          {errors.address && <p className={styles.error}>{errors.address}</p>}

          <input
            name="phone"
            placeholder="Phone"
            value={billing.phone || ""}
            onChange={handleInputChange}
         className={errors.phone ? styles.inputError : ""}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          
          <input
            name="email"
            placeholder="Email"
            value={billing.email || ""}
            onChange={handleInputChange}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <h2>Payment Method</h2>
          <div className={styles.paymentMethod}>
            <label>
              <input
                type="radio"
                value="Cash"
                checked={paymentMethod === "Cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card
            </label>
          </div>

          {/* Card details only if Card selected */}
          {paymentMethod === "Card" && (
            <div className={styles.cardForm}>
              <input
                name="cardNumber"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
              className={errors.cardNumber ? styles.inputError : ""}
              />
              {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}

              <input
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardChange}
              className={errors.expiry ? styles.inputError : ""}
              />
              {errors.expiry && <p className={styles.error}>{errors.expiry}</p>}

              <input
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
              className={errors.cvv ? styles.inputError : ""}
              />
              {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}

            </div>
          )}

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>

        {/* Order summary */}
        <div className={styles.checkoutSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryItems}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.summaryItem}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotals}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
