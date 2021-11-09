module.exports = `
  type PublicUser {
    id: String
    nickname: String
    firstName: String
    lastName: String
    email: String
  }
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
    getListUsers: [PublicUser]
  }
  type Mutation {
    login(email: String! password: String!): AuthPayload
    signInWithGoogle(accessToken: String!): AuthPayload
    register(nickname: String! email: String! password: String! googleId: String firstName: String lastName: String): AuthPayload
    onSubscribe(id: ID! challengeRoomIds: [String] challengeRoomId: String!): AuthPayload
  }
`;
