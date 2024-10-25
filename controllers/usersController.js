// controllers/usersController.js
const pool = require('../db/db');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createUser = async (req, res) => {
  const { full_name, email, phone_number, password } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (full_name, email, phone_number, password) VALUES (?, ?, ?, ?)', [full_name, email, phone_number, password]);
    res.status(201).json({ id: result.insertId, full_name, email, phone_number });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
