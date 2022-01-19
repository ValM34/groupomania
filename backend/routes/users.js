const express = require('express');
const router = express.Router(); 

const usersCtrl = require('../controllers/users');


router.post('/signup', usersCtrl.signupUser);
router.post('/signin', usersCtrl.signinUser);

module.exports = router;