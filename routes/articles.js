// // routes/articles.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Получение всех статей
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM articles', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Создание новой статьи
// router.post('/', (req, res) => {
//     const { title, author, publication_date, tags, image_path } = req.body;
//     db.query(
//         'INSERT INTO articles (title, author, publication_date, tags, image_path) VALUES (?, ?, ?, ?, ?)',
//         [title, author, publication_date, tags, image_path],
//         (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ id: results.insertId, title });
//         }
//     );
// });

// module.exports = router;

const express = require('express');
const { getRelatedArticles, getPopularArticles } = require('../controllers/articlesController');

const router = express.Router();

router.get('/related', getRelatedArticles);
router.get('/popular', getPopularArticles);

module.exports = router;
