module.exports = `
  type User {
    token: String
    email: String
    name: String
    id: String
  }
  type Mutation {
    register(name: String, password: String, email: String): User 
    login(name: String, password: String): User
  }
`;
