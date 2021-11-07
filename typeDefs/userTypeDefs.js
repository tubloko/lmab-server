module.exports = `
  type User {
    id: String
    nickname: String
    firstName: String
    lastName: String
    email: String
    googleId: String
    facebookId: String
    token: String
    challengeRoomsIds: [String]
  }
  type AuthPayload {
    user: User
  }
  type Query {
    getUser(id: ID!): AuthPayload
  }
  type Mutation {
    login(email: String! password: String!): AuthPayload
    signInWithGoogle(accessToken: String!): AuthPayload
    register(nickname: String! email: String! password: String! googleId: String firstName: String lastName: String): AuthPayload
    onSubscribe(id: ID! challengeRoomIds: [String] challengeRoomId: String!): AuthPayload
  }
`;
