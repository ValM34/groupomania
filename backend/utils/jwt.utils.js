var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 's7UcdjHZk33fiuMhH5in4Tu27BYhz6RCKFZCY82tU858bw_KA5QxDPvyi6xYdU7x7eF4z356223MPuwMe6YZSy5hz87x5N4R5BK9XS9z6up3MG_zxVB42TF748S3VmH2tMd6y67nQq5t6j8qhy9h6T3XG';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1000h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? req.headers["authorization"] : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}