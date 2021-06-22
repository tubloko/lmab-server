const jwt = require('jsonwebtoken');

module.exports = {
  getJWTToken: ({ id, name }) => jwt.sign(
    { id, name },
    'secret-key',
    { expiresIn: '10h' },
  )
}
