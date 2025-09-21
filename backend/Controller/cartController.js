const db = require("../config/db");

// Ensure carts and cart_items tables exist (simple schema)
const ensureTables = () => {
  const createCarts = `
    CREATE TABLE IF NOT EXISTS carts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  const createItems = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cart_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES coffees(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `;
  db.query(createCarts, () => {});
  db.query(createItems, () => {});
};

// Get cart items for a user
exports.getCart = (req, res) => {
  const { userId } = req.params;
  ensureTables();
  const sql = `SELECT ci.id, ci.product_id, ci.quantity, c.name, c.image, c.price
               FROM cart_items ci
               JOIN carts ca ON ci.cart_id = ca.id
               JOIN coffees c ON ci.product_id = c.id
               WHERE ca.user_id = ?`;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Upsert cart for a user (replace items)
exports.saveCart = (req, res) => {
  const { user_id, items } = req.body;
  if (!user_id || !Array.isArray(items)) return res.status(400).json({ error: 'user_id and items are required' });
  ensureTables();

  // find or create cart
  db.query('SELECT id FROM carts WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const finishWithCart = (cartId) => {
      // clear existing items
      db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (items.length === 0) return res.json({ message: 'Cart updated', cartId });
        const vals = items.map(i => [cartId, i.product_id || null, i.quantity || 1]);
        const sql = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ?';
        db.query(sql, [vals], (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Cart saved', cartId });
        });
      });
    };

    if (results.length === 0) {
      db.query('INSERT INTO carts (user_id) VALUES (?)', [user_id], (err, r) => {
        if (err) return res.status(500).json({ error: err.message });
        finishWithCart(r.insertId);
      });
    } else {
      finishWithCart(results[0].id);
    }
  });
};

// Update single cart item quantity
exports.updateItem = (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  if (quantity == null) return res.status(400).json({ error: 'quantity required' });
  db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, itemId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Quantity updated' });
  });
};

// Delete cart item
exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  db.query('DELETE FROM cart_items WHERE id = ?', [itemId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item removed' });
  });
};


