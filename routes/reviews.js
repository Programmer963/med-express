// // routes/reviews.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Получение всех отзывов
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM reviews', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Создание нового отзыва
// router.post('/', (req, res) => {
//     const { user_id, rating, review_text, doctor_id } = req.body;
//     db.query(
//         'INSERT INTO reviews (user_id, rating, review_text, doctor_id) VALUES (?, ?, ?, ?)',
//         [user_id, rating, review_text, doctor_id],
//         (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ id: results.insertId, rating, review_text });
//         }
//     );
// });

// module.exports = router;
// routes/reviews.js
const express = require('express');
const { getAllReviews, createReview } = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);

module.exports = router;
