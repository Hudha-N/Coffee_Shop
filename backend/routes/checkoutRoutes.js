// Get cart items and order summary
app.get("/api/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    `SELECT ci.id, ci.product_id, ci.quantity, c.price
     FROM cart_items ci
     JOIN carts ca ON ci.cart_id = ca.id
     JOIN coffees c ON ci.product_id = c.id
     WHERE ca.user_id = ?`,
    [userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});


// Get user billing info
app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});


// Get all items in cart_items table
app.get("/api/cart_items", (req, res) => {
  db.query("SELECT * FROM cart_items", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

