// const authService = require('../services/authService');

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const response = await authService.login(email, password);
//     res.json(response);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

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

const register = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Проверка, что все поля заполнены
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Проверка на существование пользователя
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        console.error('Error during checking user:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      // Вставка нового пользователя в базу данных
      db.query(
        'INSERT INTO users (fullName, email, phoneNumber, password) VALUES (?, ?, ?, ?)',
        [fullName, email, phoneNumber, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Error during user registration:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to register user' });
          }

          // Ответ с токеном
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = {
  login,
  register
};