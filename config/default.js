module.exports = {
  port: 4000,
  DB: {
    url: process.env.DB,
  },
  security: {
    jwtSecret: process.env.SECRET_KEY,
  },
  client: {
    clientURL: process.env.CLIENT_URL_DEV
  }
}
