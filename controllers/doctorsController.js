// controllers/doctorsController.js
const pool = require('../db/db');

const getAllDoctors = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM doctors');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllDoctors,
};
