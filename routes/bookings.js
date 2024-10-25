// routes/bookings.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Получение всех записей на приём
router.get('/', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Создание новой записи на приём
router.post('/', (req, res) => {
    const { doctor_id, date_time, user_id } = req.body;
    db.query(
        'INSERT INTO bookings (doctor_id, date_time, user_id) VALUES (?, ?, ?)',
        [doctor_id, date_time, user_id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, doctor_id });
        }
    );
});

module.exports = router;
