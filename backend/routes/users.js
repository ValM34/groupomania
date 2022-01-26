const express = require('express');
const router = express.Router(); 

const usersCtrl = require('../controllers/users');
const auth = require('../middleware/auth');


router.post('/signup', usersCtrl.signupUser);
router.post('/signin', usersCtrl.signinUser);
router.get('/', auth, usersCtrl.isLoggedIn);

module.exports = router;