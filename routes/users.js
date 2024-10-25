// // routes/users.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Получение всех пользователей
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Создание нового пользователя
// router.post('/', (req, res) => {
//     const { full_name, email, phone_number, password } = req.body;
//     db.query(
//         'INSERT INTO users (full_name, email, phone_number, password) VALUES (?, ?, ?, ?)',
//         [full_name, email, phone_number, password],
//         (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ id: results.insertId, full_name });
//         }
//     );
// });

// module.exports = router;
// routes/users.js
const express = require('express');
const { getAllUsers, createUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

module.exports = router;
