const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO customers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, phone, address],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Signup successful", customerId: result.insertId });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  db.query("SELECT * FROM customers WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
    const customer = results[0];
    const match = await bcrypt.compare(password, customer.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    // For demo: return customer info (in production, use JWT/session)
    res.json({ message: "Login successful", customer: { id: customer.id, name: customer.name, email: customer.email } });
  });
});

// Get profile (demo: by id)
router.get("/profile/:id", (req, res) => {
  db.query("SELECT id, name, email, phone, address FROM customers WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.json(results[0]);
  });
});

// Update profile
router.put("/profile/:id", (req, res) => {
  const { name, phone, address } = req.body;
  db.query(
    "UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?",
    [name, phone, address, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Profile updated" });
    }
  );
});

module.exports = router;
