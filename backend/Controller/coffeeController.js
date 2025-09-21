const db = require("../config/db");

// Get coffees by category
exports.getCoffeesByCategory = (req, res) => {
  const { category_id, c_id, c_name } = req.query;
  let sql = "SELECT * FROM coffees";
  let params = [];
  if (c_id) {
    sql += " WHERE id = ?";
    params.push(c_id);
  } else if (c_name) {
    sql += " WHERE REPLACE(LOWER(c_name), ' ', '') = ?";
    params.push((c_name || '').toLowerCase().replace(/[-\s]/g, ''));
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    params.push(category_id);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single coffee
exports.getCoffeeById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM coffees WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

// Get all products
exports.getcoffees = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get coffee by foreign key (for use in other controllers, e.g., wishlist)
exports.getCoffeeByFK = (c_id, callback) => {
  db.query("SELECT * FROM coffees WHERE id = ?", [c_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Get coffee details by foreign key (c_id)
exports.getCoffeeDetailsByFK = (req, res) => {
  const { c_id } = req.query;
  if (!c_id) return res.status(400).json({ error: "c_id is required" });
  db.query(
    "SELECT id, name, description, price, image, created_at, c_id FROM coffees WHERE id = ?",
    [c_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Coffee not found" });
      res.json(results[0]);
    }
  );
};