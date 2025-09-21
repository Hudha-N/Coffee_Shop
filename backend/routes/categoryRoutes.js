const express = require("express");
const router = express.Router();


const db = require("../config/db");
const { getCoffeesByCategory } = require("../Controller/coffeeController");

router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Return coffees for a category id
router.get("/:id/details", (req, res) => {
  // forward to coffees controller using category_id query param
  req.query = req.query || {};
  req.query.category_id = req.params.id;
  return getCoffeesByCategory(req, res);
});


module.exports = router;
