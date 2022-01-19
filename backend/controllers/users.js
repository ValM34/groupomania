const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

// Routes
exports.signupUser = async (req, res) => {

  // Params
  const email = req.body.email;
  const password = req.body.password;
  const surname = req.body.surname;
  const name = req.body.name;

  if (!email || !surname || !name || !password) {
    console.log("c'est null")
    return res.status(400).json({ 'error': 'NULL PARAMETER' });
  }


  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'PASSWORD IS NOT VALID' });
  }



  models.User.findOne({
    attributes: ['email'],
    where: { email: email }
  })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
          const newUser = models.User.create({
            email: email,
            password: bcryptedPassword,
            surname: surname,
            name: name,
            isAdmin: 0
          })
            .then(function (newUser) {
              return res.status(201).json({
                'userId': newUser.id
              })
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'CANNOT ADD USER' });
            })
        });
      } else {
        return res.status(409).json({ 'error': 'USER ALREADY EXIST' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'ERROR' });
    });






};


exports.signinUser = async (req, res) => {

  // Params
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'MISSING PARAMETER' });
  }


  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'PASSWORD IS NOT VALID' });
  }

  models.User.findOne({
    where: { email: email }
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
          if (resBcrypt) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            });
          } else {
            return res.status(403).json({ 'error': 'INVALID PASSWORD' });
          }
        })
      } else {
        return res.status(404).json({ 'error': 'USER NOT EXIST IN DB' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'UNABLE TO VERIFY USER' });
    });


}
