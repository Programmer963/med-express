// // routes/doctors.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Получение всех врачей
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM doctors', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// // Создание нового врача
// router.post('/', (req, res) => {
//     const { full_name, specialization, rating, avatar_path } = req.body;
//     db.query(
//         'INSERT INTO doctors (full_name, specialization, rating, avatar_path) VALUES (?, ?, ?, ?)',
//         [full_name, specialization, rating, avatar_path],
//         (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ id: results.insertId, full_name });
//         }
//     );
// });

// module.exports = router;

// routes/doctors.js
const express = require('express');
const { getAllDoctors } = require('../controllers/doctorsController');

const router = express.Router();

router.get('/', getAllDoctors);

module.exports = router;
