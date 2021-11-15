const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  getJWTToken: ({ id, nickname }) => jwt.sign(
    { id, nickname },
    config.get('jwtSecret'),
    { expiresIn: '10h' },
  ),
  verifyToken: (token) => {
    try {
      return jwt.verify(token, config.get('jwtSecret'));
    } catch (e) {
      return { message: e.message }
    }
  }
}
