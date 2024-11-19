const express = require('express');
const router = express.Router();
const { registerNewUser, loginUser, getUserData } = require('../controller/UserController');

router.get('/', getUserData);
router.post('/register', registerNewUser);
router.post('/login', loginUser);


module.exports = router;