module.exports = {
  DB: {
    url: process.env.DB,
  },
  Security: {
    jwtSecret: process.env.SECRET_KEY,
  },
  client: {
    clientURL: 'http://localhost:3000'
  }
}
