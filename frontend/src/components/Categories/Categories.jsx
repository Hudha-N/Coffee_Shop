import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Categories.module.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.categories}>
      {categories.map((cat) => {
        let linkTo = `/category/${cat.c_id}`;
          const raw = (cat.c_name || "");
          const name = raw.toLowerCase().replace(/[-\s]/g, '');

            // optional custom routes (compare normalized name)
            if (name === "espresso") linkTo = "/Espresso";
            else if (name === "latte") linkTo = "/Latte";
            else if (name === "cappuccino") linkTo = "/Cappuccino";
            else if (name === "icedcoffee" || name === "icedcoffee") linkTo = "/IcedCoffee";
            else if (name === "mocha") linkTo = "/Mocha";
            else if (name === "americano") linkTo = "/Americano";

        return (
          <div key={cat.c_id} className={styles.categoryCard}>
          <img
            src={cat.c_image}
            alt={cat.c_name}
            className={styles.image}
          />
          <h3 className={styles.name}>{cat.c_name}</h3>
          
          <Link to={linkTo} className={styles.button}>
            View {cat.c_name}
          </Link>
          </div> 
        );
      })}
    </div>
  );
};

export default Categories;
