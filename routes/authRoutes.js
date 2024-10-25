// // routes/auth.js
// const express = require('express');
// const { signIn, register } = require('../controllers/authController');

// const router = express.Router();

// router.post('/signin', signIn);

// router.post('/register', register);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
