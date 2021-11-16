const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  getJWTToken: ({ id, nickname }) => jwt.sign(
    { id, nickname },
    config.get('security').jwtSecret,
    { expiresIn: '10h' },
  ),
  verifyToken: (token) => {
    try {
      return jwt.verify(token, config.get('security').jwtSecret);
    } catch (e) {
      return { message: e.message }
    }
  }
}
