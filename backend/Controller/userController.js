const db = require("../config/db");

// Get Profile
exports.getProfile = (req, res) => {
  db.query(
    "SELECT id, fullName, email, phone, address, image FROM users WHERE id = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });

      res.json(results[0]);
    }
  );
};

// Update Profile
exports.updateProfile = (req, res) => {
  const { fullName, email, phone, address, image } = req.body;
  db.query(
    "UPDATE users SET fullName = ?, email = ?, phone = ?, address = ?, image = ? WHERE id = 1",
    [fullName, email, phone, address, image],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Profile updated successfully" });
    }
  );
};
