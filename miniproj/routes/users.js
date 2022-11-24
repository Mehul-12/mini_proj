const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn} = require('../middleware');
const User = require('../models/user');
const users = require('../controllers/users');
router.route('/register')
    .post(users.register);
router.route('/signin')
    .post( catchAsync(users.signin));
router.route('/:id/getuser')
    .get(isLoggedIn,users.getUser);
module.exports = router;