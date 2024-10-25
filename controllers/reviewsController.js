// controllers/reviewsController.js
const pool = require('../db/db');

const getAllReviews = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createReview = async (req, res) => {
  const { userId, rating, reviewText, doctorId } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO reviews (user_id, rating, review_text, doctor_id) VALUES (?, ?, ?, ?)', [userId, rating, reviewText, doctorId]);
    res.status(201).json({ id: result.insertId, userId, rating, reviewText, doctorId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
};
