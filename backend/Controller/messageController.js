const db = require('../config/db');

// Ensure messages table exists
const ensureMessagesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Failed to ensure messages table:', err);
  });
};

ensureMessagesTable();

exports.createMessage = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });

  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
  return res.status(500).json({ error: 'Failed to save message', detail: err.message });
    }
    res.json({ id: result.insertId, name, message });
  });
};

exports.listMessages = (req, res) => {
  // return latest 10 messages
  const sql = 'SELECT id, name, message FROM messages ORDER BY created_at DESC LIMIT 10';
  db.query(sql, (err, rows) => {
    if (err) {
  console.error(err);
  // DEBUG: return error message to help diagnose local issue
  return res.status(500).json({ error: 'Failed to fetch messages', detail: err.message });
    }
    res.json(rows);
  });
};
