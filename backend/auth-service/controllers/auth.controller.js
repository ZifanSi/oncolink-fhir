const { poolPromise } = require('../db');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Username', username)
      .input('Password', password)
      .query(`
        SELECT UserID, Username 
        FROM dbo.Users 
        WHERE Username = @Username AND Password = @Password
      `);

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.UserID,
        username: user.Username
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login };
