const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users');
router.route('/register')
    .post(users.register);
module.exports = router;