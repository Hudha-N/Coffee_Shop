const db = require("../config/db");

// Add item to wishlist
exports.addToWishlist = (req, res) => {
  const { user_id, coffee_id } = req.body;
  db.query(
    "INSERT INTO wishlist (user_id, coffee_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE coffee_id=VALUES(coffee_id)",
    [user_id, coffee_id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to add to wishlist" });
      res.json({ success: true });
    }
  );
};

// Get wishlist for user
exports.getWishlist = (req, res) => {
  const user_id = req.query.user_id;
  db.query(
    `SELECT w.coffee_id, c.name, c.image, c.price
     FROM wishlist w
     JOIN coffees c ON w.coffee_id = c.id
     WHERE w.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Failed to fetch wishlist" });
      res.json(results);
    }
  );
};

// Remove item from wishlist
exports.removeFromWishlist = (req, res) => {
  const { user_id, coffee_id } = req.body;
  db.query(
    "DELETE FROM wishlist WHERE user_id = ? AND coffee_id = ?",
    [user_id, coffee_id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to remove from wishlist" });
      res.json({ success: true });
    }
  );
};