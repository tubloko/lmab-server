const jwt = require('jsonwebtoken');

const SECRET = 'secret-key';

module.exports = {
  getJWTToken: ({ id, nickname }) => jwt.sign(
    { id, nickname },
    SECRET,
    { expiresIn: '10h' },
  ),
  verifyToken: (token) => {
    try {
      return jwt.verify(token, SECRET);
    } catch (e) {
      return { message: e.message }
    }
  }
}
