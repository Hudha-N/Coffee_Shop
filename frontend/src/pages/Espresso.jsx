import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryPage.module.css";
import MeltyInput from "../components/MeltyInput";

const Espresso = () => {
  const navigate = useNavigate();
  const [coffees, setCoffees] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [search, setSearch] = useState(""); // 👈 new state
  const [wishlist, setWishlist] = useState([]);
      
      const userId = 1; // Replace with actual logged-in user id

  const handleWishlistToggle = async (coffee) => {
    const coffeeId = coffee.id;
    const isWishlisted = wishlist.some((item) => item.id === coffeeId);
    if (isWishlisted) {
      // Remove from wishlist in DB
      await axios.post("http://localhost:5000/api/wishlist/remove", { user_id: userId, coffee_id: coffeeId });
      setWishlist(wishlist.filter((item) => item.id !== coffeeId));
    } else {
      // Add to wishlist in DB
      await axios.post("http://localhost:5000/api/wishlist/add", {
        user_id: userId,
        coffee_id: coffeeId,
        name: coffee.name || coffee.coffee_name,
        image: coffee.image,
        price: coffee.price,
      });
      setWishlist([...wishlist, coffee]);
    }
  };


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/coffees/?category_id=1")
      .then((res) => setCoffees(res.data))
      .catch((err) => console.error(err));

      // Fetch wishlist from DB
    axios
      .get(`/api/wishlist?user_id=${userId}`)
      .then((res) => setWishlist(res.data))
      .catch(() => setWishlist([]));
  }, []);

  const handleAddToCart = (coffee) => {
    const userId = 1;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = coffee.id || coffee.product_id;
    const existing = cart.find((i) => (i.product_id || i.id) === productId);
    if (!existing) {
      cart.push({
        id: productId,
        product_id: productId,
        name: coffee.name || coffee.coffee_name,
        image: coffee.image || coffee.image_url || "",
        price: coffee.price || 0,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, items: cart }),
    }).catch(() => {});
    navigate("/cart", { state: { highlightId: productId } });
  };

  // 👇 filter coffees by search text
  const filteredCoffees = coffees.filter((c) =>
    (c.name || c.coffee_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div>
      {/* Header section */}
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumbNav}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbDivider}>/</span>
          <span className={styles.breadcrumbCurrent}>Espresso Coffees</span>
        </nav>

        <h2 className={styles.pageTitle}>Espresso Coffees</h2>

        {/* 👇 Chocolate border search input */}
        <div className={styles.searchWrapper}>
          <MeltyInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search espresso types…"
            width="300px"
            height="36px"
            radius={18}
          />
        </div>
      </div>

      {/* Coffee grid */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {filteredCoffees.length > 0 ? (
            filteredCoffees.map((coffee) => (
              <div
                key={coffee.id}
                className={`${styles.card} ${
                  selectedCoffee === coffee.id ? styles.activeCard : ""
                }`}
                onClick={() =>
                  setSelectedCoffee(
                    selectedCoffee === coffee.id ? null : coffee.id
                  )
                }
              >
                  {/* Wishlist Icon */}
                                                                  <button
                                                                    className={`${styles.wishlistBtn} ${
                                                                      wishlist.some((item) => item.id === coffee.id)
                                                                        ? styles.activeWishlist
                                                                        : ""
                                                                    }`}
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      handleWishlistToggle(coffee);
                                                                    }}
                                                                  >
                                                                    <img
                                                                      src="https://cdn-icons-png.flaticon.com/512/7299/7299756.png"
                                                                      alt="wishlist"
                                                                      className={styles.wishlistIcon}
                                                                    />
                                                                  </button>
                <img
                  src={coffee.image}
                  alt={coffee.coffee_name}
                  className={styles.image}
                />
                <h2 className={styles.name}>
                  {coffee.name || coffee.coffee_name}
                </h2>
                <p className={styles.description}>{coffee.description}</p>
                <p className={styles.price}>${coffee.price}</p>

                {selectedCoffee === coffee.id && (
                  <button
                    className={styles.addButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(coffee);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No espresso coffees found </p>
          )}
        </div>
      </div>
    </div>

      );
};

export default Espresso;
