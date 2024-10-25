const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const profileImage = async (req, res) => {

  try {
    // Поиск пользователя по email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Error during user login:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (user.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

      // Ответ с токеном
      res.json({ accessToken, refreshToken, userId: user[0].userId });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
