const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Username', username)
      .input('Password', password)
      .query('SELECT * FROM dbo.Users WHERE Username = @Username AND Password = @Password');

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user.UserID, username: user.Username } });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
