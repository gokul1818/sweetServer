const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/request-magic-link', authController.requestMagicLink);
router.get('/verify-token', authController.verifyToken);



module.exports = router;
